const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let bright_image = "100", saturation_image = "100", inversion_image = "0", grayscale_image = "0";
let rotation_degree = 0, flipHorizontal_image = 1, flipVertical_image = 1;

const Load_Image = () => {
    let input_file = fileInput.files[0];
    if(!input_file) return;
    previewImg.src = URL.createObjectURL(input_file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const Save_Image = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${bright_image}%) saturate(${saturation_image}%) invert(${inversion_image}%) grayscale(${grayscale_image}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotation_degree !== 0) {
        ctx.rotate(rotation_degree * Math.PI / 180);
    }
    ctx.scale(flipHorizontal_image, flipVertical_image);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

const Apply_Filter = () => {
    previewImg.style.transform = `rotate(${rotation_degree}deg) scale(${flipHorizontal_image}, ${flipVertical_image})`;
    previewImg.style.filter = `brightness(${bright_image}%) saturate(${saturation_image}%) invert(${inversion_image}%) grayscale(${grayscale_image}%)`;
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = bright_image;
            filterValue.innerText = `${bright_image}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation_image;
            filterValue.innerText = `${saturation_image}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion_image;
            filterValue.innerText = `${inversion_image}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale_image;
            filterValue.innerText = `${grayscale_image}%`;
        }
    });
});

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotation_degree -= 90;
        } else if(option.id === "right") {
            rotation_degree += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal_image = flipHorizontal_image === 1 ? -1 : 1;
        } else {
            flipVertical_image = flipVertical_image === 1 ? -1 : 1;
        }
        Apply_Filter();
    });
});

const Update_Filter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        bright_image = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation_image = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion_image = filterSlider.value;
    } else {
        grayscale_image = filterSlider.value;
    }
    Apply_Filter();
}

const Reset_Filter = () => {
    bright_image = "100"; saturation_image = "100"; inversion_image = "0"; grayscale_image = "0";
    rotation_degree = 0; flipHorizontal_image = 1; flipVertical_image = 1;
    filterOptions[0].click();
    Apply_Filter();
}

filterSlider.addEventListener("input", Update_Filter);
resetFilterBtn.addEventListener("click", Reset_Filter);
saveImgBtn.addEventListener("click", Save_Image);
fileInput.addEventListener("change", Load_Image);
chooseImgBtn.addEventListener("click", () => fileInput.click());