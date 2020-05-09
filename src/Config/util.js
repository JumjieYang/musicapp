export const formatDate = (
    obj, 
    opt = {
        year: true,
        month: true,
        date: true
    } 
) => {
    const time = new Date(obj);
    const year = time.getFullYear();
    let month = '0' + (time.getMonth() + 1);
    month = month.substring(month.length-2, month.length);
    let date = '0' + time.getDate();
    date = date.substring(date.length-2, date.length);

    const response = [];
    if (opt.year) {
        response.push(year);
    }
    if (opt.month) {
        response.push(month);
    }
    if (opt.date) {
        response.push(date);
    }

    return response.join('-');
};

export function debounce (func, delay) {
    let timer;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function findIndex (allList, list) {
    return allList.findIndex((item) => {
        return item.id === list.id;
    });
}

export function formatPlayCount (count) {
    if (!count) {
        return 0;
    }
    return Math.floor(count);
}

export const imageRatio = (width = 0, height = width) => {
    return `?param=${window.devicePixelRatio * width}x${window.devicePixelRatio * height}`;
}