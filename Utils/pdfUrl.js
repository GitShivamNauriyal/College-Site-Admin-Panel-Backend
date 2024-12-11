export const generateUrl =(folderName,fileName)=>{
    return `${process.env.Site_Url}/Notices/${folderName}/${fileName}`;
}
export const generateUrlTimeTable =(folderName,fileName)=>{
  return `${process.env.Site_Url}/TimeTable/${folderName}/${fileName}`;
}
export const generateUrlSyllabus =(folderName,fileName)=>{
  return `${process.env.Site_Url}/Syllabus/${folderName}/${fileName}`;
}


  

    
  