// 호스트 숙소 등록 화면 
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const serverUrl='http://127.0.0.1:8000/mainpage'
const serverUrl = 'become-host/'
//CSRF 토큰 
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



const BecomeHost = () => {
    const [previewImg, setPreviewImg] = useState([]); // image url
    const [name, setName] = useState([]); // image file name
    // const [modelResult, setModelResult]= useState([]);
    const navigate = useNavigate(); // ammenities.js 로 데이터 전달 위해 

    // 이미지 업로드 하는 함수 
    const insertImg = (e) => {
        console.log((e.target.files))
        // var reader =new FileReader();
        // 이미지 여러 장을 저장하는 함수 
        // 현재 한 장의 이미지에 대해서만 동작 
        function insertAll(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file) // file url

            reader.onload = () => {
                const previewImgUrl = reader.result
                if (previewImgUrl && previewImg.length < 10) {
                    setPreviewImg([...previewImg, previewImgUrl])
                    setName([...name, file['name']])
                    // alert("!") // test 
                } else {
                    alert("등록된 이미지가 10장을 초과할 수 없습니다!");
                }
            };
        }
        

        if (e.target.files) {
            // 이미지를 여러 장 올릴 때 array 의 각 인덱스 마다 insertAll 함수를 호출하는 부분 
            Array.prototype.forEach.call(e.target.files, (file) => insertAll(file));
        }

    };
    // 이미지 삭제 
    const deleteImg = (index) => {
        const imgArr = previewImg.filter((el, idx) => idx !== index) // image url 
        const nameArr = name.filter((el, idx) => idx !== index) // image name 

        setPreviewImg([...imgArr]);
        setName([...nameArr]);
    };
    // 이미지 미리보기 
    const getPreviewImg = () => {
        console.log(previewImg);

        if (previewImg === null || previewImg.length === 0) {
            return (
                <p>등록된 이미지가 없습니다</p>
            )
        }
        else {
            return previewImg.map((el, index) => {
                // const {name}= el
                return (
                    <>
                        <Image
                            src={previewImg[index]}
                            style={{ maxWidth: "400px" }}>

                        </Image>
                        <p>{name[index]}</p>
                        <button onClick={() => deleteImg(index)}>삭제</button>
                    </>
                )
            })
        }
    };
    // 서버로 데이터 전송하는 함수 
    async function uploadData() {
        // const uploadData = () => {
        const formData = new FormData();
        // 이미지 여러 장 전송 
        for (let index = 0; index < previewImg.length; index++) {
            formData.append('text', name[index])
            // 이미지 변환
            const byteString = atob(previewImg[index].split(",")[1]);
            // Blob를 구성하기 위한 준비
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ia], {
                type: "image/jpeg"
            });
            const file = new File([blob], name[index]);
            // 위 과정을 통해 만든 image폼을 FormData 에 저장 
            formData.append("images", file);
        }
        if (previewImg) {
            console.log("숙소 업로드"); // test 
            console.log(previewImg); // test 

            // POST 요청 
            axios({
                method: "POST",
                // url: serverUrl,
                url : 'http://127.0.0.1:8000/become-host/',
                mode: "cors",
                // data: previewImg,
                data: formData,
                // headers: {'content-type': 'multipart/form-data'}
            })
                .then(response => {
                    // console.log(response.data['detect_result']['result']['post_1']);
                    console.log(response.data);
                    let detect_result = response.data.detect_result.result;
                    let classi_result = response.data.classi_result.result;
                    // let text_result= response.data.text_result.result;
                    navigate("/become-host/ammenities", { state: { detection_result: detect_result, classification_result: classi_result} });
                })
                .catch((err) => { console.log(err) })
            alert("성공!") // test 
        }
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>호스트 숙소 게시글 화면</h1>
            <p style={{ textAlign: 'center' }}>
                숙소 등록하는 화면입니다
            </p>
            <p style={{ textAlign: 'center' }}>숙소 이미지 10장 이내로 올려주세요</p>
            {/* <Button onClick={uploadData} variant="primary" type="submit" href="/become-host/ammenities">다음</Button> */}
            <Button onClick={uploadData} variant="primary">다음</Button>
            {/* 이미지 업로드 */}
            <form encType='multipart/form-data'>
                <input
                    type="file"
                    multiple
                    // id="upload-img"
                    name="images"
                    accept="image/*"
                    onChange={(e) => insertImg(e)} />
            </form>
            {/* 이미지 미리보기 */}
            {getPreviewImg()}
        </div>
    );
};

export default BecomeHost;