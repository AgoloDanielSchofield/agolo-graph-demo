import { SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ISummarizeButton } from '../../models/esg-components.model';
import './SummarizeButton.scss';

const SummarizeButton = (props: ISummarizeButton) => {
  const { onSummarizeBtnClick, summarizeBtnDisabled, summarizeBtnLoading } =
    props;

  return (
    <Button
      onClick={onSummarizeBtnClick}
      disabled={summarizeBtnDisabled}
      className="summarize-button"
      loading={summarizeBtnLoading}
      type="primary"
    >
      <SyncOutlined /> Summarize
    </Button>
  );
};

export default SummarizeButton;
