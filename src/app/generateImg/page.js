'use client'
import Image from "next/image";
import {useState} from "react";
import {Button, Input, Skeleton} from "antd";

export default function Page() {
    const url = `http://8.209.221.168:7860/sdapi/v1/txt2img`;
    const [img, setImg] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const getImg = () => {
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                steps: 30,
            }),
        })
            .then(res => res.json())
            .then(res => {
                const image = res.images[0];
                setLoading(false)
                setImg(image)
            })
    }

    const onChange = (e) => {
        const val = e.target.value;
        setPrompt(val)
    }

    return (
        <div className="max-w-3xl mx-auto py-4">
            <div className="flex justify-center">
                <Input className="bg-slate-500" type="text" value={prompt} onChange={onChange}/>
                <Button className="bg-white" onClick={getImg}>getImg</Button>
            </div>
            <p>typing some prompt and hit getImg button</p>
            {loading ? <Skeleton className="bg-white rounded p-4" active/> : null}
            <div className="flex justify-center py-4">
                {!loading && img ?
                    <Image
                        src={`data:image/png;base64,${img}`}
                        alt="pic"
                        width={800}
                        height={600}
                    />
                    : null
                }
            </div>
        </div>
    )
}