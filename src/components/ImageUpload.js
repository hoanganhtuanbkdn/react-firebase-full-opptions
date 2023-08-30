/* eslint-disable default-case */
import React, { useState } from 'react';

const ImageUpload = () => {
	const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
	const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		// xử lý chọn ảnh
	};

	return (
		<div className="py-10">
			<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
				<div className="mb-4">
					<input
						type="file"
						onChange={handleChange}
						className="hidden"
						id="imageInput"
					/>
					<label
						htmlFor="imageInput"
						className="block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
					>
						Select Image
					</label>
					{image && <p className="mt-2">Selected: {image.name}</p>}
					{image && (
						<img
							src={URL.createObjectURL(image)}
							alt="Preview"
							className="mt-2 rounded-lg shadow-md"
							style={{ maxWidth: '100%', maxHeight: '200px' }}
						/>
					)}
				</div>
				{progress > 0 && (
					<progress value={progress} max="100" className="w-full" />
				)}
				{image && (
					<button
						onClick={handleUpload}
						className="bg-green-500 text-white px-4 py-2 rounded-lg"
					>
						Upload
					</button>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
