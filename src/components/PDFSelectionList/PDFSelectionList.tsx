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
    options?.map(({ name, id }) => ({
      value: name,
      label: name,
      key: id,
    }));

  const filterSearchList = (query: string): IDocument[] =>
    documentsList.filter((item) =>
      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

  const onSelect = (_: string, option: any) => {
    setSelectedDocumentID(option.key);
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
      style={{ width: '100%' }}
      defaultActiveFirstOption={false}
      notFoundContent={renderNoFoundContent()}
    >
      <Input.Search size="middle" placeholder="Select a company" enterButton />
    </AutoComplete>
  );
};

export default PDFSelectionList;
