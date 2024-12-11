
export const fileType = (mime)=>{


if(!SupportedMines.includes(mime))
{
    return "image must be type of xslx or pdf"
}

return true ;
}

const SupportedMines = [
    "application/pdf",
    "application/vnd.ms-excel", 
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
 ];
