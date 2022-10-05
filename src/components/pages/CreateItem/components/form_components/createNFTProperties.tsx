import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldArrayRenderProps,
  Form
} from 'formik';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import NftAttribute from 'src/components/components/NftAttributes';
import { INftAttribute } from 'src/types/nfts.types';

import { ReactComponent as CrossIcon } from '../../../../../assets/images/icon/cross-icon.svg';

const CreateNFTProperty = ({
  addAttribute,
  values,
  setAttrHelper,
  getNftAttrValueInput
}) => {
  const [editable, setEditable] = useState(false);

  return (
    <>
      <div className="createNft__attribute_details">
        <div className="nft__form_field createNft__form_field_secondary">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="form-label">Properties</h5>
              <p className="sublabel">
                Textual traits that show up as rectangles
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center how-field-appears justify-content-end">
                {values.attributes.length ? (
                  <></>
                ) : (
                  <>
                    <p className="sublabel">How it appears:</p>
                    <div className="attribute-field-property">
                      <div className="nft-attr-normal">
                        <div className="nft-attr-name">EYE COLOR</div>
                        <div className="nft-attr-value">Blue</div>
                      </div>
                    </div>
                  </>
                )}
                {editable ? (
                  <></>
                ) : (
                  <button
                    type="button"
                    className="btn-main btn-add text-uppercase cursor-pointer"
                    onClick={() => {
                      addAttribute();
                      setEditable(true);
                    }}
                  >
                    {values.attributes.length ? '+ Add/Edit' : '+'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="attribute-fields"> */}
        <FieldArray
          name="attributes"
          render={(arrayHelpers) => {
            setAttrHelper(arrayHelpers);
            if (values.attributes.length == 0) {
              return <></>;
            } else {
              return (
                <div className="attribute-fields">
                  <div className="attribute-fields-property">
                    {values.attributes.map(
                      (attribute: INftAttribute, index: number) => (
                        <div className="attribute-field-property">
                          <NftAttribute {...attribute} />
                        </div>
                      )
                    )}
                  </div>

                  <div className="attribute-editable-property">
                    {editable ? (
                      <div>
                        <Table>
                          <thead>
                            <tr>
                              <th width={265}>Name</th>
                              <th width={280}>Values</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {values.attributes.map(
                              (attribute: INftAttribute, index: number) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr>
                                  <td>
                                    <Field
                                      placeholder="Name"
                                      value={attribute.trait_type}
                                      name={`attributes.${index}.trait_type`}
                                      className={`form-control input__holder__single`}
                                    />
                                  </td>
                                  <td>
                                    {getNftAttrValueInput(attribute, index)}
                                  </td>
                                  <td className="actions">
                                    <a
                                      className="icon-custom"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        if (values.attributes.length == 1) {
                                          setEditable(false);
                                        }
                                      }}
                                    >
                                      <CrossIcon />
                                    </a>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>
                        <div className="editable-buttons d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn-main btn-add btn-grad cursor-pointer"
                            onClick={() => addAttribute()}
                          >
                            +
                          </button>
                          <button
                            width="200px"
                            type="button"
                            className="btn-main btn-save btn-grad cursor-pointer"
                            onClick={() => {
                              setEditable(false);
                              const tempAttributes: array = [];
                              values.attributes.forEach(
                                (attribute: any, index: number) => {
                                  if (
                                    attribute.trait_type !== '' &&
                                    attribute.value !== undefined &&
                                    attribute.value !== ''
                                  ) {
                                    tempAttributes.push(attribute);
                                  }
                                }
                              );
                              values.attributes = tempAttributes;
                            }}
                          >
                            Save Properties
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            }
          }}
        />
        {/* </div> */}
      </div>
    </>
  );
};
export default CreateNFTProperty;
