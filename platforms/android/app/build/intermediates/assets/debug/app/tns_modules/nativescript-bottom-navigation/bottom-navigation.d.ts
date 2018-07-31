import { BottomNavigationBase, BottomNavigationTabBase } from './bottom-navigation.common';
export declare class BottomNavigation extends BottomNavigationBase {
    readonly android: any;
    createNativeView(): Object;
    initNativeView(): void;
    createTabs(tabs: BottomNavigationTab[]): void;
    protected selectTabNative(index: number): void;
}
export declare class BottomNavigationTab extends BottomNavigationTabBase {
    constructor(title: string, icon: string, selectable?: boolean, parent?: WeakRef<BottomNavigationBase>);
}
