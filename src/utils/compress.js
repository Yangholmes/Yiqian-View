/**
 * 压缩工具
 * @file
 * @author Yangholmes 2018-10-10
 */
export default {
    /**
     * compress image
     * @param  {[type]} img origin image
     * @param  {[type]} [size=null] result image size
     * @return {[type]} compress image data
     */
    image(img, size = 720) {
        // 排除动图，动图不做压缩
        if (/^data:image\/gif/.test(img)) {
            return new Promise(resolve => {
                resolve(img);
            });
        }
        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            image = new Image();
        image.src = img;
        return new Promise(resolve => {
            image.onload = () => {
                let width = image.width,
                    height = image.height;
                if (width > size) {
                    height = (size / width) * height;
                    width = size;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(image, 0, 0, width, height);
                let result = canvas.toDataURL('image/jpeg', .9);
                // console.log('compress rate is ', (img.length - result.length) / img.length);
                // console.log('img size are ', img.length, result.length);
                // console.log('compress value is ', img.length - result.length);
                ctx = null; canvas = null; image = null;
                resolve(result);
            };
        });
    }
};
