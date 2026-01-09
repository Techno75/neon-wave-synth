export const toucheNoirPosition = (index : number): number => {
    console.log("index", index);
    
    switch (index) {
        case 1:
            return 82
            break;
        case 3:
            return 186
            break;
        case 6:
            return 397
            break;
        case 8:
            return 500
            break;
        case 10:
            return 605
            break;
        case 13:
            return 818
            break;
        case 15:
            return 923
            break;
        case 18:
            return 1132
            break;
        case 20:
            return 1238
            break;
        case 22:
            return 1342
            break;
        default:
            return 0
            break;
    }
}