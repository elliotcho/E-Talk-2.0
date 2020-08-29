import React from 'react';

function PostBody({content, seeMore, toPostDetails}){
    const computeContent = (content) => {
        let res = "";
        let charsLeft = 312;
        let limitExceeded = false;

        for(let i=0;i<content.length;i++){
            if(charsLeft <= 0){
                limitExceeded=true;
                break;
            }

            else{
                res += content[i];

                let consumed = (content[i] === '\n')? 63: 1;

                charsLeft -= consumed;
            }
        }

        if(limitExceeded){
            res += "...";
        }

        return [res + '\n', limitExceeded];
    }

    const contentArray = (seeMore)? [content, false] : computeContent(content);

    const formattedContent = contentArray[0];
    const limitExceeded = contentArray[1];

    return(
        <main className='content'>
            {limitExceeded? 
                (<div> 
                    {formattedContent} 
                    
                    <span className ='ml-1 see-more' onClick ={toPostDetails}>
                        See More
                    </span>
                </div>):
                formattedContent
            }
        </main>
    )
}

export default PostBody;