import getConfig from "./config";

const CHATGPT_BTN_ID = 'kanbert-chatgpt-btn';

class Kanbert {

    constructor() {
        this.appendStyles();
        this.initHandler();
        this.observe();
    }

    appendStyles() {
        const styles = `<style>
            #kanbert-chatgpt-btn {
              width: 20px;
              height: 20px;
              cursor: pointer;
              border: none;
              background: none;
              padding: 0;
              margin: 0;
              outline: none;
              position: absolute;
              top: 7px;
              right: 7px; 
            }
            
            #kanbert-chatgpt-btn:disabled, #kanbert-chatgpt-btn[disabled="true"] {
              opacity: 0.3 !important;
              cursor: not-allowed;
            }
            
            #kanbert-chatgpt-btn[loading="true"] {
              animation: kanbert-chatgpt-animation-rotation 2s infinite linear;
            }
       
            #kanbert-chatgpt-btn svg {
              width: 20px;
              height: 20px;
            }
            
            @keyframes kanbert-chatgpt-animation-rotation {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(359deg);
              }
            }
        </style>`;

        document.head.insertAdjacentHTML("beforeend", styles);
    }

    async fetchComment(instructions: string = ''):Promise<string> {
        const config = await getConfig();

        const body = {
            model: "gpt-3.5-turbo-1106",
            messages: this.generateMessages(config["kanbert-comment-full-name"], instructions),
            temperature: 0.4,
            max_tokens: 3000,
        };

        console.log(body.messages.reduce((prompt, message) => prompt + message.content + '\n\n', ''));

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config["kanbert-comment-openapi-key"]}`
                },
                body: JSON.stringify(body)
            });

            const completion = await response.json();

            if (!response.ok) {
                throw new Error(completion.error.message);
            }

            return Promise.resolve(completion.choices[0].message.content || 'No response from ChatGPT.');
        } catch (e: any) {
            return Promise.resolve(`An error occurred while fetching data from ChatGPT. ${e.message}`);
        }
    }

    generateMessages(name = '', instructions: string = ''): Array<{role: string, content: string}> {
        const messages: Array<{role: string, content: string}> = [];
        const CHAR_LIMIT = 40000;

        const author = document.querySelector('[class^="FieldUpdate__TaskDescriptionFooter"]')?.textContent;

        let respondTo = author;
        let comments:Array<string> = [];
        document.querySelectorAll('[class^="Item__CommentWrapper"]').forEach((wrapper) => {
            let commentName:string = '';
            const commentNameElement = wrapper.querySelector('[class^="Item__CommentNameStyled"]');

            if (commentNameElement) {
                // @ts-ignore
                commentName = [].reduce.call(commentNameElement.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
            }

            const message = wrapper.querySelector('[class*=" Item__CommentTextStyled"]')?.textContent;

            if (commentName && message) {
                comments.push(`${commentName} wrote: ${message}`);

                if (commentName !== name) {
                    respondTo = commentName;
                }
            }
        });


        let systemPrompt = `You are ${name}, a web developer with a very good web development expertise.`;

        messages.push({"role": "system", "content": systemPrompt});

        messages.push({"role": "user", "content": `Please read the given task description and all the comments related to it to understand the context.`});
        messages.push({"role": "user", "content": 'Task Description:' + document.querySelector('[class*="FieldUpdate__CommentTextStyled"]')?.textContent});

        if (comments.length > 0) {
            // Append comments
            let promptLength = messages[0].content!.length + messages[1].content!.length + instructions.length;
            let commentsMessages = '';

            comments.reverse().forEach((comment) => {
                if (promptLength + comment.length < CHAR_LIMIT) {
                    commentsMessages = comment + '\n\n' + commentsMessages;
                    promptLength += comment.length;
                }
            });

            commentsMessages = 'Comments:\n\n' + commentsMessages;

            messages.push({"role": "user", "content": commentsMessages});
        }

        let response = `Respond to the last comment from ${respondTo} in a short, friendly and simple English, providing relevant information or assistance.`;
        if (instructions) {
            response += ` Use following input as base for your reply: ${instructions}`;
        }

        messages.push({"role": "user", "content": response});

        return messages;
    };

    initHandler() {
        document.body.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            const btn = target?.closest(`#${CHATGPT_BTN_ID}`);

            if (!btn) return;

            const commentEditor = btn?.closest('[class^="Activity__TasksDetailActivityWrapper"]')?.querySelector(`[class="DraftEditor-root"]`) as HTMLElement;

            if (!commentEditor) return;

            btn.setAttribute("disabled", "true");
            btn.setAttribute("loading", "true");

            const comment = await this.fetchComment(commentEditor.textContent || '');

            if (comment.length) {
                await this.setEditorText(commentEditor, comment);
            } else {
                await this.setEditorText(commentEditor, "ChatGPT failed.");
            }

            btn.removeAttribute('disabled');
            btn.removeAttribute('loading');
        });
    }

    inject(el: Element) {
        if (el.getAttribute("hasChatGPT") === "true") return;
        el.setAttribute("hasChatGPT", "true");

        el?.insertAdjacentHTML(
            "beforeend",
            `<button id="${CHATGPT_BTN_ID}" role="button">
                        <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M119.592 52.3793C121.043 48.0693 121.545 43.5036 121.064 38.987C120.583 34.4705 119.131 30.1071 116.804 26.1884C109.726 14.0353 95.5002 7.78387 81.6066 10.7214C77.7597 6.50049 72.8547 3.35231 67.384 1.59305C61.9133 -0.166198 56.0697 -0.474584 50.44 0.698867C44.8103 1.87232 39.5927 4.48629 35.3112 8.27827C31.0297 12.0702 27.835 16.9067 26.0481 22.302C21.537 23.2144 17.2752 25.0662 13.5477 27.7335C9.82019 30.4008 6.71276 33.8222 4.4331 37.769C-2.7219 49.9029 -1.0974 65.2081 8.44961 75.6178C6.99332 79.9257 6.48643 84.4906 6.96284 89.0073C7.43925 93.524 8.88798 97.8883 11.2121 101.808C18.2991 113.966 32.5341 120.217 46.4351 117.275C49.4915 120.67 53.2468 123.383 57.4505 125.232C61.6542 127.081 66.2094 128.025 70.8121 128C85.0527 128.012 97.6692 118.944 102.019 105.568C106.53 104.654 110.791 102.801 114.518 100.134C118.245 97.4671 121.353 94.0466 123.634 90.1009C130.702 77.9887 129.071 62.7663 119.592 52.3793ZM70.8121 119.622C65.1279 119.631 59.622 117.666 55.2596 114.071L56.0271 113.642L81.8621 98.9323C82.5052 98.5603 83.039 98.0297 83.4113 97.3927C83.7836 96.7557 83.9816 96.0341 83.9856 95.2988V59.3685L94.9081 65.6007C95.0171 65.6555 95.0932 65.7586 95.1127 65.8784V95.6519C95.0847 108.879 84.2211 119.595 70.8121 119.622ZM18.5791 97.6203C15.7285 92.7649 14.7049 87.0735 15.6886 81.5471L16.4556 82.0014L42.3166 96.7118C42.9565 97.0822 43.685 97.2775 44.4269 97.2775C45.1688 97.2775 45.8973 97.0822 46.5371 96.7118L78.1276 78.7467V91.1859C78.1247 91.2503 78.1071 91.3133 78.0761 91.3701C78.0451 91.4269 78.0016 91.476 77.9486 91.5139L51.7811 106.401C40.1526 113.009 25.2961 109.08 18.5791 97.6203ZM11.7746 42.1092C14.645 37.2226 19.1758 33.4954 24.5646 31.5876V61.8657C24.5549 62.5972 24.7444 63.318 25.1133 63.9527C25.4823 64.5873 26.0171 65.1127 26.6621 65.474L58.0991 83.3636L47.1766 89.5958C47.1176 89.6267 47.0517 89.6428 46.9849 89.6428C46.918 89.6428 46.8522 89.6267 46.7931 89.5958L20.6766 74.735C9.07111 68.0993 5.0911 53.456 11.7746 41.9834V42.1092ZM101.508 62.6735L69.9676 44.6073L80.8651 38.4003C80.9243 38.3693 80.9902 38.3531 81.0571 38.3531C81.1241 38.3531 81.19 38.3693 81.2491 38.4003L107.366 53.2873C111.359 55.5601 114.614 58.9065 116.752 62.9359C118.889 66.9652 119.82 71.5112 119.437 76.0431C119.053 80.575 117.371 84.9058 114.586 88.5297C111.8 92.1537 108.028 94.9214 103.708 96.5096V66.231C103.685 65.5008 103.47 64.789 103.085 64.1653C102.699 63.5416 102.156 63.0275 101.508 62.6735ZM112.379 46.5506L111.611 46.0958L85.8017 31.2596C85.1579 30.887 84.425 30.6906 83.6786 30.6906C82.9323 30.6906 82.1994 30.887 81.5556 31.2596L49.9901 49.2252V36.786C49.9834 36.7228 49.9941 36.6589 50.0211 36.6012C50.0482 36.5435 50.0905 36.494 50.1436 36.458L76.2601 21.5962C80.2628 19.3216 84.8393 18.2183 89.4544 18.4152C94.0694 18.6121 98.5322 20.1012 102.321 22.7082C106.109 25.3152 109.067 28.9323 110.848 33.1366C112.629 37.3409 113.16 41.9586 112.378 46.4494L112.379 46.5506ZM44.0306 68.6029L33.1081 62.3959C33.0535 62.3633 33.0069 62.3193 32.9714 62.267C32.936 62.2146 32.9127 62.1553 32.9031 62.093V32.3955C32.9092 27.8396 34.2299 23.3797 36.7109 19.537C39.1919 15.6943 42.7307 12.6277 46.9134 10.6957C51.0961 8.76378 55.75 8.04632 60.3309 8.62722C64.9117 9.20812 69.2303 11.0634 72.7816 13.9761L72.0141 14.4052L46.1791 29.1151C45.5362 29.4872 45.0024 30.0177 44.6302 30.6548C44.258 31.2918 44.0602 32.0134 44.0561 32.7486L44.0306 68.6029ZM49.9646 55.9866L64.0336 47.9883L78.1276 55.9871V71.9838L64.0846 79.9827L49.9906 71.9838L49.9646 55.9866Z" fill="#75ab9e"/>
                        </svg>
                </button>`
        );
    }

    observe() {
        const selector = '[class^="Activity__TasksDetailActivityWrapper"] [class^="Editor__ToolbarWrapper"],[class*=" Activity__TasksDetailActivityWrapper"] [class^="Editor__ToolbarWrapper"]';

        const observer = new MutationObserver(mutations => {
            const toolbar = document.querySelector(selector);
            if (toolbar) {
                this.inject(toolbar);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async setEditorText(commentInputWrapper: HTMLElement, text: string) {
        const data = new DataTransfer();
        const editable = commentInputWrapper?.querySelector(`[contenteditable]`);

        editable?.addEventListener("selectAll", () => {
            document.execCommand("selectAll");
        });

        if (editable?.textContent?.length) {
            (editable as any)?.click();
            editable.dispatchEvent(new CustomEvent("selectAll"));
            await new Promise((res) => setTimeout(res, 500));
        }

        data.setData("text/plain", text);

        editable?.dispatchEvent(
            new ClipboardEvent("paste", {
                bubbles: true,
                clipboardData: data,
                cancelable: true,
            })
        );
    }
}

export { Kanbert };