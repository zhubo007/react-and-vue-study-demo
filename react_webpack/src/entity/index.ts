export interface ProductObj {

    productId: number;//可选变量

    productName: string;

    followTime: string;

    expectPrice: number;

    startPrice: number;

    brandType: string;

    fiveLevel: number;

    productDie: string;

    brandName?: string;

    reference: string
}
export interface BrandObj {

    boxId?: string;//可选变量

    boxKey: string;

    boxText: string;

    boxCode: string;

    sort: number;

    boxName: string;
}
export interface TradeCommonEntity {
    dealNo: string;
    productId: number;
    seller: string;
    buyer: string;
    payWay: string;
    payType: string;
    productNum: number;
    productPrice: number;
    totalPrice: number;
    recordTime: string;
    discountDie: string
    platformId: string
    brandName: string
    brandId: string
}

export interface BoxItemEntity {
    boxId?: string;//可选变量

    boxKey: string;

    boxText: string;

    sort: number;

    boxName: string;

    boxCode: string
}
export interface UserEntity {

    userId: string;

    userName: string;

    realName: string;

    age: number;

    gender: string;

    lastLoginTime: string;

    isActive: number;
}
interface AccountProps {
    accounts: TradeCommonEntity[];
    param: {
        startTime: string;
        endTime: string;
    };
    setParam: (param: AccountProps['param']) => void;
}

class User {
    name: string;
    age: number;
    weight?: number
}
class Lee<T> {

    entity: T;

    say = () => {
        console.log(this.entity)
    }
}
//泛型我只关注于我需要的数据，我不关注具体的数据格式，体现多态继承和封装
let lee = new Lee<User>()
lee.entity = {age: 30, name: "zhubo"}
lee.say();

enum Direction {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3
}

console.log(0==Direction.UP)