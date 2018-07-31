import { AddChildFromBuilder, View } from 'tns-core-modules/ui/core/view';
import { CssProperty, Property } from 'tns-core-modules/ui/core/properties';
import { EventData } from 'tns-core-modules/data/observable';
import { Style } from 'tns-core-modules/ui/styling/style';
import { Color } from 'tns-core-modules/color';
export interface OnTabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare abstract class BottomNavigationBase extends View implements AddChildFromBuilder {
    tabs: BottomNavigationTabBase[];
    selectedTabIndex: number;
    activeColor: string;
    inactiveColor: string;
    backgroundColor: string;
    keyLineColor: string;
    selectTab(index: number): void;
    onTabSelected(index: number): boolean;
    _addChildFromBuilder(name: string, value: any): void;
    protected abstract selectTabNative(index: number): void;
}
export declare const tabsProperty: Property<BottomNavigationBase, BottomNavigationTabBase[]>;
export declare const activeColorProperty: Property<BottomNavigationBase, string>;
export declare const activeColorCssProperty: CssProperty<Style, Color>;
export declare const inactiveColorProperty: Property<BottomNavigationBase, string>;
export declare const inactiveColorCssProperty: CssProperty<Style, Color>;
export declare const backgroundColorProperty: Property<BottomNavigationBase, string>;
export declare const backgroundColorCssProperty: CssProperty<Style, Color>;
export declare const keyLineColorProperty: Property<BottomNavigationBase, string>;
export declare const keyLineColorCssProperty: CssProperty<Style, Color>;
export declare class BottomNavigationTabBase {
    constructor(title: string, icon: string, selectable?: boolean, parent?: WeakRef<BottomNavigationBase>);
    private _title;
    title: string;
    private _icon;
    icon: string;
    private _selectable;
    selectable: boolean;
    private _parent?;
    parent: WeakRef<BottomNavigationBase>;
}
