export const isFalsy = (value) => value === 0 ? false : !value;

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
    const result = {...object};
    Object.keys(result).forEach(key=>{
        const value = object[key];
        if (isFalsy(value)){
            delete result[key]
        }
    });
    return result;
};
//Hook方法使用use开头
export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
};

// const debounce = (func, delay) => {
//     let timeout;
//
//     return (...param) => {
//         if (timeout){
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(function () {
//             func(...param);
//         }, delay);
//     }
// }
//
// const  log = debounce(() =>{console.log('call')},5000)

export const useDebounce = (value, delay) => {
    const {debouncedValue, setDebouncedValue} = useState(value);
    useEffect(() => {
        //每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        //每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    },[value, delay]);
    return debouncedValue;
};