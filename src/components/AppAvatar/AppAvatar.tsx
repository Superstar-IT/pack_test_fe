import { FunctionComponent, ChangeEvent, useCallback, createRef } from 'react';
import { Avatar, AvatarProps, IconButton } from '@mui/material';

interface AppAvatarProps extends Omit<AvatarProps, 'onChange'> {
  filetype?: string;
  editable?: boolean;
  onChange?: (file: File | null) => void;
}

/**
 * Application styled Form container
 * @component AppForm
 */
const AppAvatar: FunctionComponent<AppAvatarProps> = ({
  children,
  filetype,
  editable = false,
  onChange,
  ...restProps
}) => {
  const fileInputRef = createRef<HTMLInputElement>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && onChange) {
        onChange(e.target.files[0]);
      }
    },
    [onChange]
  );

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  return (
    <IconButton disabled={!editable} onClick={handleClick}>
      <Avatar {...restProps} />
      <input ref={fileInputRef} type="file" accept={filetype ?? '*'} onChange={handleChange} hidden />
    </IconButton>
  );
};

export default AppAvatar;
