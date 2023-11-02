
/**
 * 下载文件
 * 
 * @param {string} url 
 * @param {string} name 
 */
export const downloadFile = (url, name) => {
    fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
            // 将链接地址字符内容转变成blob地址
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            // 修改下载文件的名字
            a.download = name;
            document.body.appendChild(a);
            a.click();
        });
}