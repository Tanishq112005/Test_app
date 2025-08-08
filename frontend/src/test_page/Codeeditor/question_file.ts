let files : any[] = [] ; 

export function question_file_making(question_number : number){
   for(let i = 0 ; i<question_number ; i++){
    files.push({
        name : `q${i}` , 
        language : "" , 
        value : "" 
    })
   }

}

export default files  ;
