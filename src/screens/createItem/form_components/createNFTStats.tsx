import { ErrorMessage, Field, FieldArray } from 'formik';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ReactComponent as CrossIcon } from 'src/assets/images/icon/cross-icon.svg';
import NftAttribute from 'src/components/NftAttributes';
import { INftAttribute } from 'src/types/nfts.types';

interface IProps {
  addAttributeStats: () => void;
  values: any;
  setAttrStatsHelper: any;
  getNftAttrValueInput: (attribute: INftAttribute, index: number) => any;
}

const CreateNFTStats = ({
  addAttributeStats,
  values,
  setAttrStatsHelper,
  getNftAttrValueInput
}: IProps) => {
  const [editable, setEditable] = useState(false);

  const removeBlankAttributes = () => {
    const tempAttributes: any = [];
    values.attributesStats.forEach((attribute: any) => {
      if (
        attribute.trait_type !== '' &&
        attribute.value !== '' &&
        attribute.max_value !== ''
      ) {
        tempAttributes.push(attribute);
      }
    });
    values.attributesStats = tempAttributes;
  };

  const displayAttributesStats = (arrayHelpers: any) => {
    setAttrStatsHelper(arrayHelpers);
    if (values.attributesStats.length == 0) {
      return <></>;
    } else {
      return (
        <div className="attribute-fields">
          <div className="attribute-fields-property attribute-fields-stat">
            {values.attributesStats.map(
              (attribute: INftAttribute, index: number) => (
                <div key={index} className="attribute-field-stat">
                  <NftAttribute {...attribute} />
                </div>
              )
            )}
          </div>

          {editable ? (
            <div className="attribute-editable-property attribute-editable-stats">
              <Table>
                <thead>
                  {values.attributesStats.length === 0 ? (
                    <></>
                  ) : (
                    <tr>
                      <th>Name</th>
                      <th>
                        Values <span> Total </span>
                      </th>
                      x<th></th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {values.attributesStats.map(
                    (attribute: INftAttribute, index: number) => (
                      <tr key={index}>
                        <td>
                          <Field
                            placeholder="Name"
                            value={attribute.trait_type}
                            name={`attributesStats.${index}.trait_type`}
                            className={`form-control input__holder__single`}
                          />
                          <ErrorMessage
                            name={`attributesStats.${index}.trait_type`}
                          >
                            {(msg) => <div className="error-form">{msg}</div>}
                          </ErrorMessage>
                        </td>
                        <td>{getNftAttrValueInput(attribute, index)}</td>
                        <td className="actions">
                          <a
                            className="icon-custom"
                            onClick={() => {
                              arrayHelpers.remove(index);
                              if (values.attributesStats.length == 1) {
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
                  onClick={() => addAttributeStats()}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn-main btn-save btn-grad cursor-pointer"
                  onClick={() => {
                    setEditable(false);
                    removeBlankAttributes();
                  }}
                >
                  Save Stats
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <div className="createNft__attribute_details">
        <div className="nft__form_field createNft__form_field_secondary">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="form-label">Stats</h5>
              <p className="sublabel">Numerical traits that show as numbers</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center how-field-appears justify-content-end">
                {values.attributesStats.length ? (
                  <></>
                ) : (
                  <>
                    <p className="sublabel">How it appears:</p>
                    <div className="attribute-field-stat">
                      <div className="nft-attr-ranking ">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="nft-attr-name">Speed</span>
                          <span className="nft-attr-value">3 of 5</span>
                        </div>
                        <div className="progress">
                          <div
                            role="progressbar"
                            className="progress-bar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '20px' }}
                          />
                        </div>
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
                      addAttributeStats();
                      setEditable(true);
                    }}
                  >
                    {values.attributesStats.length ? '+ Add/Edit' : '+'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <FieldArray
          name="attributesStats"
          render={(arrayHelpers) => {
            return displayAttributesStats(arrayHelpers);
          }}
        />
      </div>
    </>
  );
};
export default CreateNFTStats;
