const checkAvailability=(centers,age)=>{
    let options=[]
    for(let center of centers){
        console.log(center)
        for(let session of center.sessions){
            if(session.available_capacity>0){
                console.log(session.min_age_limit)
                if(session.min_age_limit==45 && age.length==3){
                    let option={
                        Hospital:center.name,
                        fee_type:center.fee_type,
                        date: session.date,
                        available_capacity:session.available_capacity,
                        slots:session.slots
                    }
                    options.push(option)
                }
                else if(session.min_age_limit==18){
                    let option={
                        Hospital:center.name,
                        fee_type:center.fee_type,
                        date: session.date,
                        available_capacity:session.available_capacity,
                        slots:session.slots
                    }
                    options.push(option)
            }
        }
    }
     
}
return options
}

module.exports={checkAvailability}