import React from 'react';

function PostBody({content, seeMore, toPostDetails}){
    const computeContent = (content) => {
        let res = "";
        let charsLeft =312;
        let limitExceeded = false;

        for(let i =0;i<content.length;i++){
            if(charsLeft <=0 ){
                limitExceeded=true;
                break;
            }

            else if(content[i] === '\n'){
                res+=content[i];
                charsLeft-=63;
            }

            else{
                res+=content[i];
                charsLeft--;
            }
        }

        if(limitExceeded){res += "...";}

        return [res, limitExceeded];
    }

    const contentArray = (seeMore)? [content, false] : computeContent(content);

    return(
        <main className='content'>
            {contentArray[1]? 
            (<div> 
                {contentArray[0] + '\n'} 
                <span className ='ml-1 see-more' onClick ={toPostDetails}>See More</span>
                </div>):
            contentArray[0]}
        </main>
    )
}

export default PostBody;