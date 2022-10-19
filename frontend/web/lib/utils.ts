
/**
 * 指定した桁数のランダム文字列を返す
 * @param N 桁数
 * @returns ランダム文字列
 */
export const getRandomString = ( N:number ) => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomString = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');

    return randomString;
}
