import { useState, useEffect } from 'react';
import { AutoComplete, Input, Empty, Spin } from 'antd';
import { IPdfSelectionList } from '../../models/esg-components.model';
import { IDocument } from '../../models/esg-summary.model';
import './PDFSelectionList.scss';

const PDFSelectionList = (props: IPdfSelectionList) => {
  const { isFetchingPDFList, documentsList, setSelectedDocumentID } = props;
  const [options, setOptions] = useState<IDocument[]>();

  useEffect(() => {
    setOptions([...documentsList]);
  }, [documentsList]);

  const renderOptions = () =>
    options?.map(({ name }) => ({
      value: name,
      label: name,
    }));

  const filterSearchList = (query: string): IDocument[] =>
    documentsList.filter((item) =>
      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

  const onSelect = (key: string) => {
    setSelectedDocumentID(key);
    setOptions(documentsList);
  };

  const handleSearch = (value: string) => {
    setOptions(value ? filterSearchList(value) : documentsList);
  };

  const renderNoFoundContent = () => (
    <div className="text-center">
      {isFetchingPDFList ? (
        <Spin />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No documents"
        />
      )}
    </div>
  );

  return (
    <AutoComplete
      options={renderOptions()}
      onSelect={onSelect}
      onSearch={handleSearch}
      open
      dropdownClassName="pdf-list-dropdown"
      style={{ width: 300 }}
      defaultActiveFirstOption={false}
      notFoundContent={renderNoFoundContent()}
    >
      <Input.Search size="middle" placeholder="Select a company" enterButton />
    </AutoComplete>
  );
};

export default PDFSelectionList;
