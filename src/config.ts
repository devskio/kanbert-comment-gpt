const OPTIONS = [
    "kanbert-comment-openapi-key",
    "kanbert-comment-full-name",
] as const;

export type StorageKeys = (typeof OPTIONS)[number];

export type Config = Record<StorageKeys, any>;

export const DEFAULT_CONFIG: Config = {
    "kanbert-comment-openapi-key": "",
    "kanbert-comment-full-name": "",
};

export default (): Promise<Config> =>
    new Promise((resolve, reject) =>
        chrome?.storage?.local?.get(OPTIONS, (result) => {
            const config = Object.keys(DEFAULT_CONFIG).reduce((a, c) => {
                return {
                    ...a,
                    // @ts-ignore
                    [c]: result?.[c] || DEFAULT_CONFIG[c],
                };
            }, {});

            resolve(config as Config);
        })
    );