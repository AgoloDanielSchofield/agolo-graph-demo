import React, { useEffect, useState } from 'react';
import { Badge, Button, message, Table, Tooltip, Upload } from 'antd';
import {
  CloudUploadOutlined,
  DeleteOutlined,
  LoadingOutlined,
  SelectOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PresetStatusColorType } from 'antd/lib/_util/colors';
import { IDocument } from '../../models/esg-summary.model';
import { downloadJSONFile, formatBytes } from '../../utils/helpers';
import './OBSDocsUpload.scss';
import { fetchPDFList } from '../../redux/actions/esg';
import { IObsDocsUpload } from '../../models/esg-components.model';

const getTitleWithTooltip = (text: string, hoverText: string) => (
  <Tooltip title={hoverText}>{text}</Tooltip>
);
const OBS_DOCS_WAREHOUSE = process.env.REACT_APP_DOCS_WAREHOUSE;
const { Dragger } = Upload;

const OBSDocsUpload = (props: IObsDocsUpload) => {
  const { documentsList, fetchPDFListProp } = props;

  const [docsTableData, setDocsTableData] = useState<IDocument[]>([]);
  const [docsTableLoading, setDocsTableLoading] = useState(false);
  const [uploadFilesList, setUploadFilesList] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isFetchingConvertedPDF, setIsFetchingConvertedPDF] = useState(false);
  const [isFetchingParsedPDF, setIsFetchingParsedPDF] = useState(false);
  const [clickedFileID, setClickedFileID] = useState('');

  const getSortedDocuments = (documents: IDocument[]): IDocument[] =>
    documents.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

  const fetchOBSDocs = async () => {
    setDocsTableLoading(true);
    await fetchPDFListProp();
    setDocsTableData(documentsList);
    setDocsTableLoading(false);
  };

  useEffect(() => {
    fetchOBSDocs();
  }, []);

  const resetState = () => {
    setDocsTableLoading(false);
    setUploadFilesList([]);
    setUploading(false);
  };

  const deleteFile = async (id: string, name: string) => {
    const response = await fetch(`${OBS_DOCS_WAREHOUSE}/docs/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const newDocsTableData = docsTableData.filter((doc) => doc.id !== id);
      setDocsTableData(newDocsTableData);
      message.success(`${name} Deleted`);
    } else {
      message.error('Could not delete file');
    }
  };
  const syncFile = async (id: string, name: string) => {
    const response = await fetch(`${OBS_DOCS_WAREHOUSE}/docs/sync/${id}`, {
      method: 'PUT',
    });
    if (response.ok) {
      const updatedDoc = await response.json();
      const newDocsTableData = docsTableData.filter((doc) => doc.id !== id);
      setDocsTableData([updatedDoc, ...newDocsTableData]);
      message.success(`${name} Synchronized`);
    } else {
      message.error('Could not sync file');
    }
  };
  const syncAll = async () => {
    const FAILURE_MESSAGE = 'Docs Sync Failed';
    try {
      const response = await fetch(`${OBS_DOCS_WAREHOUSE}/docs/sync/all`, {
        method: 'PUT',
      });
      if (response.ok) {
        const data = await response.text();
        message.success(data);
      } else {
        message.error(FAILURE_MESSAGE);
      }
    } catch (error) {
      message.error(FAILURE_MESSAGE);
    }
  };

  const uploadOBSDocs = async (e: any) => {
    e.preventDefault();
    const uploadFilesFormData = new FormData();
    for (let i = 0; i < uploadFilesList.length; i += 1) {
      uploadFilesFormData.append('file', uploadFilesList[i]);
    }
    setUploading(true);
    try {
      const response = await fetch(`${OBS_DOCS_WAREHOUSE}/docs/`, {
        method: 'POST',
        body: uploadFilesFormData,
      });
      const data = await response.json();
      setDocsTableData(getSortedDocuments([data, ...docsTableData]));
      message.success(`File uploaded.`);
    } catch (error) {
      setUploading(false);
      message.error(`File failed to upload.`);
    } finally {
      resetState();
    }
  };

  const fetchPDFExtractedText = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    type: string
  ) => {
    e.preventDefault();
    setClickedFileID(id);
    if (type === 'converted') {
      setIsFetchingConvertedPDF(true);
    } else {
      setIsFetchingParsedPDF(true);
    }
    try {
      const response = await fetch(`${OBS_DOCS_WAREHOUSE}/docs/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      const {
        name,
        summarization_request: { articles },
        document_parser_response: documentParserResponse,
      } = data;
      const fileName = name.replace(
        '.pdf',
        type === 'converted' ? ' - Extracted Sections' : ' - Parsed Response'
      );
      const jsonData =
        type === 'converted'
          ? {
              articles,
              title: name,
            }
          : {
              ...documentParserResponse,
              title: name,
            };
      downloadJSONFile(jsonData, fileName);
      message.success(`${fileName}.JSON downloaded.`);
    } catch (error) {
      message.error(`Failed to download JSON file`);
    }
    if (type === 'converted') {
      setIsFetchingConvertedPDF(false);
    } else {
      setIsFetchingParsedPDF(false);
    }
    setClickedFileID('');
  };

  const DOCUMENT_STATUS_MAP = [
    { api: 'COMPLETE', badge: 'success' },
    { api: 'FAILED', badge: 'error' },
    { api: 'IN_PROGRESS', badge: 'processing' },
    { api: 'READY', badge: 'default' },
  ];

  const getBadgeStatus = (status: any) => {
    if (!status) {
      return 'default';
    }
    const badgeStatus = DOCUMENT_STATUS_MAP.find(
      (docStatus) => docStatus.api === status
    );

    return (
      badgeStatus ? badgeStatus.badge : 'default'
    ) as PresetStatusColorType;
  };

  const tableColumns = [
    {
      title: getTitleWithTooltip('Sync', 'Sync PDF Parsing'),
      dataIndex: 'id',
      key: 'sync',
      render: (id: string, { name }: any) => (
        <Button
          onClick={() => syncFile(id, name)}
          type="link"
          className="action-button"
        >
          <SyncOutlined />
        </Button>
      ),
    },
    {
      title: getTitleWithTooltip('Parse Status', 'Document Parsing'),
      dataIndex: 'parsing_status',
      key: 'parsing_status',
      render: (parsingStatus: string) => (
        <div className="text-center">
          <Badge status={getBadgeStatus(parsingStatus)} />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'id',
      key: 'name',
      sorter: (a: IDocument, b: IDocument) => a.name.localeCompare(b.name),
      render: (id: string, { name }: any) => (
        <Button
          target="_blank"
          rel="noopener noreferrer"
          href={`${OBS_DOCS_WAREHOUSE}/docs/download/${id}`}
          type="link"
        >
          {`${name} ` || '-'} <SelectOutlined rotate={90} />
        </Button>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter: (a: IDocument, b: IDocument) => a.size - b.size,
      render: (size: number) => formatBytes(size) || '-',
    },
    {
      title: 'Pages',
      dataIndex: 'numberOfPages',
      key: 'pages',
      sorter: (a: IDocument, b: IDocument) => a.size - b.size,
      render: (pages: number) => (
        <div>{(pages && `${pages} Pages`) || '-'}</div>
      ),
    },
    {
      title: 'Converted PDF',
      dataIndex: 'id',
      key: 'converted-pdf',
      render: (id: string) => (
        <Button
          onClick={(e) => fetchPDFExtractedText(e, id, 'converted')}
          rel="noreferrer"
          target="_blank"
          type="link"
        >
          Download
          {isFetchingConvertedPDF && id === clickedFileID ? (
            <LoadingOutlined />
          ) : (
            <SelectOutlined rotate={90} />
          )}
        </Button>
      ),
    },
    {
      title: 'Parsed PDF',
      dataIndex: 'id',
      key: 'parsed-pdf',
      render: (id: string) => (
        <Button
          onClick={(e) => fetchPDFExtractedText(e, id, 'parsed')}
          rel="noreferrer"
          target="_blank"
          type="link"
        >
          Download
          {isFetchingParsedPDF && id === clickedFileID ? (
            <LoadingOutlined />
          ) : (
            <SelectOutlined rotate={90} />
          )}
        </Button>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'parse_timestamp',
      key: 'parse_timestamp',
      sorter: (a: IDocument, b: IDocument) =>
        new Date(a.parse_timestamp).valueOf() -
        new Date(b.parse_timestamp).valueOf(),
      render: (timestamp: Date) => timestamp || '-',
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'delete',
      render: (id: string, { name }: any) => (
        <Button
          onClick={() => deleteFile(id, name)}
          type="link"
          className="action-button"
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div className="obs-upload-wrapper">
      <div className="upload-section">
        <Dragger
          accept=".pdf"
          name="file"
          customRequest={({ onSuccess }: any) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 0);
          }}
          multiple
          onChange={(info: any) => {
            const { status } = info.file;
            if (status === 'done') {
              message.success(`${info.file.name} added.`);
            } else if (status === 'error') {
              message.error(`Failed to add ${info.file.name}.`);
            }
          }}
          beforeUpload={(file: any) => {
            if (file.type !== 'application/pdf' || file.size > 157286400) {
              message.error('Only PDF files up to 150MB are allowed.');
              return false;
            }
            setUploadFilesList([...uploadFilesList, file]);
            return true;
          }}
          onRemove={(selectedFile: any) => {
            const filteredList = uploadFilesList.filter(
              (file: any) => file.name !== selectedFile.name
            );
            setUploadFilesList([...filteredList]);
          }}
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Choose ESG-Related PDFs under 150MB</p>
        </Dragger>
        <Button
          type="primary"
          onClick={uploadOBSDocs}
          disabled={uploadFilesList.length === 0}
          loading={uploading}
          className="upload-btn"
          icon={<UploadOutlined />}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
        <Button type="primary" onClick={syncAll} className="sync-btn">
          <SyncOutlined /> Sync All
        </Button>
      </div>
      <Table
        pagination={{ total: docsTableData.length, pageSize: 100 }}
        loading={docsTableLoading}
        columns={tableColumns}
        dataSource={docsTableData}
        rowKey="id"
        className="justify-content-center m-2 p-4"
      />
    </div>
  );
};

const mapStateToProps = ({ esg }: any) => ({
  documentsList: esg.documentsList,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPDFListProp: () => dispatch(fetchPDFList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OBSDocsUpload);
