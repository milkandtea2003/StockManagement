export function CategoryColor(category) {
    let color = "#ffffff";

    switch (category.toLowerCase()) {
        case "flower":
            color = "#e81109"; 
            break;
        case "pot":
            color = "#c9bb16"; 
            break;
        case "soil":
            color = "#e016a7"; 
            break;
    }
    return color
}