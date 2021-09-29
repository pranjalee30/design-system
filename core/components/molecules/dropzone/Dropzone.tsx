import * as React from 'react';
import classNames from 'classnames';
import { Icon, Text } from '@/index';
import DropzoneBase, { DropzoneBaseProps } from './DropzoneBase';
import DropzoneActive from './DropzoneActive';
import DropzoneError from './DropzoneError';
import { BaseProps, extractBaseProps } from '@/utils/types';
import { fileErrorMessages } from './FileErrors';

export type DropZoneType = 'standard' | 'compressed' | 'tight';

export interface DropzoneProps extends BaseProps, DropzoneBaseProps {
  /**
   * Description of accepted formats in `FileUploader`
   */
  formatLabel?: string;
  /**
   * Size of `Dropzone`
   */
  type: DropZoneType;
  /**
   * Description of maximum size in `FileUploader`
   */
  sizeLabel?: string;
  /**
   * Link component to download sample file
   */
  sampleFileLink?: React.ReactNode;
}

export const Dropzone = (props: DropzoneProps) => {
  const { type, sizeLabel, className, formatLabel, sampleFileLink, disabled } = props;

  const { open, getRootProps, getInputProps, isDragActive, isDragReject, fileError } = DropzoneBase(props);

  const baseProps = extractBaseProps(props);

  const DropzoneClass = classNames(
    {
      ['Dropzone']: true,
      [`Dropzone--${type}`]: type,
      ['Dropzone--disabled']: disabled,
      ['Dropzone--active']: isDragActive,
      ['Dropzone--error']: isDragReject,
    },
    className
  );

  const IconClass = classNames({
    ['Dropzone-icon']: true,
    [`Dropzone-icon--${type}`]: true,
    ['Dropzone-icon--disabled']: disabled,
  });

  const WrapperClass = classNames({
    ['DropzoneWrapper']: true,
    [`DropzoneWrapper--${type}`]: true,
  });

  const renderDropzone = () => {
    if (isDragReject) return <DropzoneError type={type} error={fileErrorMessages[fileError]} />;

    if (isDragActive) return <DropzoneActive type={type} />;

    return (
      <React.Fragment>
        {type !== 'tight' && <Icon name="backup" size={64} className={IconClass} />}
        <div className={WrapperClass} data-test="DesignSystem-Dropzone-Wrapper">
          <span>
            <Text size="large" weight="strong" className="mr-2" appearance={disabled ? 'disabled' : 'default'}>
              Drag your files here or
            </Text>
            {/* TODO(a11y): fix accessibility  */}
            {/* eslint-disable */}
            <span className="cursor-pointer" onClick={open}>
              <Text size="large" weight="strong" appearance={disabled ? 'disabled' : 'link'}>
                browse files
              </Text>
            </span>
            <input {...getInputProps()} />
          </span>
          {/* eslint-enable */}
          {formatLabel && <Text appearance={disabled ? 'disabled' : 'subtle'}>{formatLabel}</Text>}
          {sizeLabel && <Text appearance={disabled ? 'disabled' : 'subtle'}>{sizeLabel}</Text>}
          {sampleFileLink && <div className="mt-5">{sampleFileLink}</div>}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div {...getRootProps()} {...baseProps} className={DropzoneClass} data-test="DesignSystem-Dropzone">
      {renderDropzone()}
    </div>
  );
};

Dropzone.displayName = 'Dropzone';

Dropzone.defaultProps = {
  ...DropzoneBase.defaultProps,
  type: 'standard',
};

export default Dropzone;
