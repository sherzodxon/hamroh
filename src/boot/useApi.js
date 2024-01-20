import axios from "axios";

 const name=axios.create({baseURL:"https://retoolapi.dev/lncqOG"});
 const book= axios.create({baseURL:"https://retoolapi.dev/OS6065"});
 const surah=axios.create({baseURL:"https://api.alquran.cloud/v1"})

 const NAMES={
    names:"/names",
    one_name:(nameID)=>`/names/${nameID}`,
    pagination_name:(limit,page)=>`/names?_${limit}=10&_page=${page}`,
    put_names:(id)=>`/names/${id}`,
 }

 const BOOK={
   surahs:"/quronsuralar",
   pagination_surahs:(limit,page)=>`/quronsuralar?_${limit}=10&_page=${page}`,
 }
 
 const SURAH={
   one_surah:(surahID)=>`/surah/${surahID}`
 }
 export {name,book,surah,NAMES,BOOK,SURAH}