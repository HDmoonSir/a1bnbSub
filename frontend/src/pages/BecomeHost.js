// 호스트 숙소 등록 화면 
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { back_ip_port } from './back_ip_port'

const serverUrl = `${back_ip_port}user/regist`;
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
        const selectedFiles = e.target.files;
        // var reader =new FileReader();
        // 이미지 여러 장을 저장하는 함수 
        // 현재 한 장의 이미지에 대해서만 동작 
        function insertAll() {
            const newPreviewImg = [];
            const newNames = [];
            // var reader = new FileReader();
            // reader.readAsDataURL(file) // file url
            Array.prototype.forEach.call(selectedFiles, (file) => {
                var reader = new FileReader();
                reader.readAsDataURL(file); // file url

                reader.onload = () => {
                    const previewImgUrl = reader.result;
                    if (previewImgUrl && previewImg.length + newPreviewImg.length < 10) {
                        newPreviewImg.push(previewImgUrl);
                        newNames.push(file.name);

                        if (newPreviewImg.length === selectedFiles.length) {
                            setPreviewImg([...previewImg, ...newPreviewImg]);
                            setName([...name, ...newNames]);
                        }
                        // alert("!") // test 
                    } else {
                        // alert("등록된 이미지가 10장을 초과할 수 없습니다!");
                        window.location.reload();
                        // alert("등록된 이미지가 10장을 초과할 수 없습니다!");
                        // return;
                    }
                    //
                    
                };
        });

        // 모든 이미지를 처리한 후에 상태를 한 번에 업데이트
        // if (newPreviewImg.length === selectedFiles.length) {
        //     setPreviewImg([...previewImg, ...newPreviewImg]);
        //     setName([...name, ...newNames]);
        // }
    }
        

    if (selectedFiles) {
        // // 이미지를 여러 장 올릴 때 array 의 각 인덱스 마다 insertAll 함수를 호출하는 부분 
        Array.prototype.forEach.call(selectedFiles, (file) => insertAll(file));
        // insertAll(selectedFiles)
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

        // if (previewImg === null || previewImg.length === 0) {
        //     return (
        //         <p>이미지를 등록해주세요.</p>
        //     )
        // }
        // else {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' , textAlign: 'center'}}>
                  {previewImg.map((el, index) => (
                    <div key={index} style={{ flex: '0 0 calc(25% - 5px)' }}>
                        <Image
                          src={previewImg[index]}
                          width="100%"
                          height="auto"
                          title={name[index]}
                        />     
                        <button onClick={() => deleteImg(index)} style={{ backgroundColor: '#eb6864', color: 'white', border: 'None', margin: '5px', borderRadius: '5px' }}>
                          삭제
                        </button>
                    </div>
                  ))}
                </div>
              );
              
        // }
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
        if (previewImg.length > 0) {
            console.log("숙소 업로드"); // test 
            console.log(previewImg); // test 

            // POST 요청 
            axios({
                method: "POST",
                url: serverUrl,
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
                    let text_result= response.data.text_result.result;
                    let bbox_result = response.data.bbox_result;
                    navigate("/user/regist/result", { state: { result_detection: detect_result, result_classification: classi_result, result_textgeneration: text_result, result_bboxing : bbox_result} });
                })
                .catch((err) => { console.log(err) })
            alert("성공!") // test 
        }
    }
    return (
        // <div style={{ textAlign: 'center' }}>
        <div>
            <div style={{ textAlign: 'center', padding: '20px'}}>
                {/* <h1>숙소 사진을 올려주세요.</h1> */}
                <h2>숙소 사진을 10장 이내로 올려주세요</h2>
                <div style = {{margin: '5px', textAlign: 'right', marginRight: '40px'}}>
                {/* <Button onClick={uploadData} variant="primary" type="submit" href="/become-host/ammenities">다음</Button> */}
                <Button onClick={uploadData} style = {{backgroundColor: '#BC5350', width: '100px', height: '40px'}}>등록하기</Button>
                </div>
            </div>
            <p></p>
            {/* 이미지 업로드 */}
            <div style ={{ textAlign: 'center', justifyContent: 'center', display: 'flex'}}>
                <form encType='multipart/form-data' style={{ marginBottom: '20px' }}>
                    {/* <label htmlFor="images" style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>이미지 업로드</label> */}
                    <label
                        htmlFor="images"
                        style={{
                            display: 'block',
                            backgroundColor: '#eb6864',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '300%',               
                        }}
                        >
                        이미지 업로드
                        <input
                            type="file"
                            multiple
                            id="images"
                            name="images"
                            accept="image/*"
                            style={{
                            display: 'none',
                            }}
                            onChange={(e) => insertImg(e)}
                        />
                    </label>


                </form>
            </div>
            <div style={{ textAlign: 'center' }}>
                {/* 이미지 미리보기 */}
                {getPreviewImg()}
            </div>
        </div>
    );
};

export default BecomeHost;
