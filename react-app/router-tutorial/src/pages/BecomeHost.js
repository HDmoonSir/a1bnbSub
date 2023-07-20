// 호스트 숙소 등록 화면 
import {useState} from 'react';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';

const BecomeHost = () => {
    const [previewImg, setPreviewImg]= useState([]);
    // 이미지 업로드 
    const insertImg =(e) =>{

        var reader =new FileReader();

        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onloadend =() =>{
            const previewImgUrl= reader.result

            if (previewImgUrl && previewImg.length <10){
                setPreviewImg([...previewImg,previewImgUrl])
            }else{
                alert("등록된 이미지가 10장을 초과할 수 없습니다!");
            }
        };

    };
    // 이미지 삭제 
    const deleteImg =(index) =>{
        const imgArr= previewImg.filter((el, idx) => idx !== index)
        
        setPreviewImg([...imgArr]);
    };
    // 이미지 미리보기 
    const getPreviewImg= ()=> {

        if(previewImg === null || previewImg.length ===0 ){
            return (
                <p>등록된 이미지가 없습니다</p>
            )
        }
        else{
            return previewImg.map((el, index) =>{
                // const {name}= el
                return (
                    <>
                        <Image 
                        src= {previewImg[index]}
                        style={{maxWidth:"300px"}}>

                        </Image>
                            {/* <img src= {previewImg[index]}/> */}
                        <button onClick={() =>deleteImg(index)}>삭제</button>
                    </>
                )
            })
        }
    };
    
    return (
      <div>
        <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
        <p style={{textAlign:'center'}}>
            숙소 등록하는 화면입니다
        </p>
        <p style={{textAlign:'center'}}>숙소 이미지 10장 이내로 올려주세요</p>
        <Button variant="primary" type="submit" href="/become-host/ammenities">다음</Button>
        {/* 이미지 업로드 */}
        <form encType='multipart/form-data'>
            <input 
            type="file" multiple 
            id="upload-img"
            accept="image/*"
            onChange={(e) => insertImg(e)}/>
        </form>
        {/* 이미지 미리보기 */}
        {getPreviewImg()}
        {/* <img alt="미리보기" 
        src= {previewImg} 
        style={{maxWidth:"300px"}}
        multiple ></img>
        <button onClick={deleteImg}>삭제</button> */}
      </div>
    );
  };
  
  export default BecomeHost;