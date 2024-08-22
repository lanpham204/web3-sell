import { Form, Input, Button, message } from "antd";
import { createNFT } from "../services/gameShiftService";
import { useWallet } from "@solana/wallet-adapter-react";
export const CreateNFT = () => {
    const { publicKey, sendTransaction, connected } = useWallet();
    const onFinish = (values) => {
        console.log(values);

        createNFT(values.description, values.imageUrl, values.name, publicKey)
            .then((response) => {
                message.success("NFT created successfully!");
                console.log("Response:", response);
            })
            .catch((error) => {
                message.error("Failed to create NFT!");
                console.error("Error:", error);
            });
    };
    return (
        <>
        <div style={{height:"150px"}}></div>
        <Form
            name="nft-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please input the description!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Image URL"
                name="imageUrl"
                rules={[{ required: true, message: "Please input the image URL!" }]}
            >
                <Input />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button type="primary" htmlType="submit">
                    Create NFT
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}