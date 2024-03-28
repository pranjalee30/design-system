import React from 'react';
import { BaseProps, BaseHtmlProps } from '@/utils/types';
import { Listbox } from '@/index';
import classNames from 'classnames';
import MenuContext from './MenuContext';
import { handleKeyDown } from './utils';

type ItemTagType = 'li' | 'div' | 'a';

export interface MenuItemProps extends BaseProps, BaseHtmlProps<HTMLLIElement | HTMLDivElement> {
  /**
   * Set a custom element for `Menu List Item`
   */
  tagName?: ItemTagType;
  /**
   * Handler to be called when `Menu List Item` is clicked
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * React Element to be added inside `Menu List Item`
   */
  children: React.ReactNode;
  /**
   * Disables the menu item
   */
  disabled?: boolean;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const { children, className, onClick, disabled, ...rest } = props;
  const contextProp = React.useContext(MenuContext);
  const isSubMenuTrigger = false;

  const { setOpenPopover, focusedOption, setFocusedOption, menuTriggerRef, listRef, triggerRef, menuID, onItemClick } =
    contextProp;

  const MenuItemClassName = classNames(
    {
      'Menu-Item': true,
    },
    className
  );

  React.useEffect(() => {
    const handlePopoverOpen = () => {
      setOpenPopover?.(true);
    };

    const handlePopoverClose = () => {
      setOpenPopover?.(false);
    };

    (ref as React.RefObject<HTMLDivElement>)?.current?.addEventListener('focus', handlePopoverOpen);
    (ref as React.RefObject<HTMLDivElement>)?.current?.addEventListener('blur', handlePopoverClose);

    return () => {
      (ref as React.RefObject<HTMLDivElement>)?.current?.removeEventListener('focus', handlePopoverOpen);
      (ref as React.RefObject<HTMLDivElement>)?.current?.removeEventListener('blur', handlePopoverClose);
    };
  }, [ref]);

  const onFocusHandler = (event: React.FocusEvent) => {
    setFocusedOption?.(event.target as HTMLElement);
    setOpenPopover?.(true);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    handleKeyDown(
      event,
      focusedOption,
      setFocusedOption,
      setOpenPopover,
      menuTriggerRef,
      listRef,
      null,
      isSubMenuTrigger,
      triggerRef,
      menuID
    );
  };

  const onClickHandler = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) {
      return;
    }
    setOpenPopover?.(false);
    onClick?.(event);
    onItemClick?.(event);
  };

  return (
    <Listbox.Item
      data-test="DesignSystem-Menu-ListItem"
      className={MenuItemClassName}
      tabIndex={-1}
      onKeyDown={onKeyDownHandler}
      onFocus={onFocusHandler}
      onClick={onClickHandler}
      disabled={disabled}
      ref={ref}
      role="menuitem"
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </Listbox.Item>
  );
});

MenuItem.displayName = 'MenuItem';

MenuItem.defaultProps = {
  tagName: 'a',
};

export default MenuItem;