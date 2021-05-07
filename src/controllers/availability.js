const checkAvailability=(centers,age)=>{
    let available=0
    for(let center of centers){
        for(let session of center.sessions){
            if(session.available_capacity>0){
                if(session.min_age_limit==45 && age.length==3){
                    available=1
                    return available
                }
                else if(session.min_age_limit==18){
                    available=1
                    return available
                }
            }
        }
    }
    return available
}

module.exports={checkAvailability}