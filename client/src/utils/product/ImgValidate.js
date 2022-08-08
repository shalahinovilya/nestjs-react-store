const imgMaxWidthHeight = [1000, 1000]
const imgMinWidthHeight = [600, 600]

export const checkImageSize = async (imgEvent) => {
    return new Promise((resolve, reject) => {

        if (!imgEvent?.target?.files) resolve({err: "please, select a file"})
        const reader = new FileReader();
        reader.readAsDataURL(imgEvent.target.files[0]);

        reader.onload = async (imgEvent) => {
            const image = new Image();
            image.src = imgEvent.target.result;
            image.onload = async (imgEvent) => {
                const height = imgEvent.target.height;
                const width = imgEvent.target.width;

                if (width > imgMaxWidthHeight[0] || height > imgMaxWidthHeight[1]) {
                    resolve({err: "Height and Width must not exceed 1000px."})
                }
                if (width < imgMinWidthHeight[0] || height < imgMinWidthHeight[1]) {
                    resolve({err: "Height must be > 600 and Width must be > 600."})
                }
                resolve({err: ""})
            };
        };
    })
}
