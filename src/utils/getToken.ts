export const getToken = (url: string) => {
    return url.substring(1).split('&').reduce<{[key: string]: string}>((init, item) => {
        let parts = item.split('=');
        init[parts[0]] = decodeURIComponent(parts[1]);
        return init;
    }, {});
};