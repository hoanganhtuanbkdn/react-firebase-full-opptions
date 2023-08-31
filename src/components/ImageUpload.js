/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig';
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
} from 'firebase/storage';

const metadata = {
	contentType: 'image/jpeg',
};

const ImageUpload = () => {
	const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
	const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
	const [uploadedImages, setUploadedImages] = useState([]); // state hiển thị danh sách ảnh đã tải lên store

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		const storageRef = ref(storage, `images/${image.name}`);

		const uploadTask = uploadBytesResumable(storageRef, image, metadata);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progress);
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setUploadedImages([downloadURL, ...uploadedImages]);

					alert(
						'Upload image successfully, download URL: ' +
							downloadURL
					);

					setImage(null);
					setProgress(0);
					console.log('File available at', downloadURL);
				});
			}
		);
	};

	const getListAllImages = () => {
		const listRef = ref(storage, 'images');

		// Find all the prefixes and items.
		listAll(listRef)
			.then(async (res) => {
				res.prefixes.forEach((folderRef) => {
					console.log('folderRef', folderRef);
					// All the prefixes under listRef.
					// You may call listAll() recursively on them.
				});

				const images = await Promise.all(
					res.items.map(async (itemRef) => {
						const url = await getDownloadURL(itemRef);

						return url;
					})
				);
				setUploadedImages(images);
			})
			.catch((error) => {
				console.error('Error getting download URL:', error);

				// Uh-oh, an error occurred!
			});
	};

	useEffect(() => {
		getListAllImages();
	}, []);
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
			{uploadedImages.length > 0 && (
				<div className="mt-4 container mx-auto">
					<h2 className="text-lg font-semibold">Uploaded Images</h2>
					<div className="mt-2 masonry sm:masonry-sm md:masonry-md">
						{uploadedImages.map((url, index) => (
							<div
								key={index}
								className="rounded-lg mb-6 break-inside"
							>
								<img
									src={url}
									alt={`Uploaded ${index}`}
									className="h-auto max-w-full rounded-lg"
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageUpload;
