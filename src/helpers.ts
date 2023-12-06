export function delay() {
    return new Promise<void>(res => setTimeout(res, 1500));
}