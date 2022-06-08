export const setStorageSync = (
	key,
	data
) => {
	uni.setStorageSync(key, data)
}

export const getStorageSync = (key) => {
	return uni.getStorageSync(key)
}

export const removeStorageSync = key => {
	uni.removeStorageSync(key)
}

export const clearStorageSync = () => {
	uni.clearStorageSync()
}