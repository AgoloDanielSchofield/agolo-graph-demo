import { useEffect, useRef } from 'react';
import { Card, Spin } from 'antd';
import classnames from 'classnames';
import './SummaryOutput.scss';
import { ISummaryOutput } from '../../models/esg-components.model';
import { ISummary } from '../../models/esg-summary.model';

const IS_STG_ENV = process.env.NODE_ENV !== 'production';

const SummaryOutput = (props: ISummaryOutput) => {
  const {
    summary,
    isFetchingESGSummary,
    handleSummaryHTML,
    summarizedDocumentTitle,
  } = props;
  const text = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    handleSummaryHTML(text?.current?.innerHTML);
  }, [text?.current?.innerHTML]);

  const sectionBodyClassNames = classnames({
    'section-body ': true,
    'mb-5': !IS_STG_ENV,
  });

  const sectionSentenceClassNames = classnames({
    'section-sentence ': true,
    'mb-3': IS_STG_ENV,
    'm-0 mb-2': !IS_STG_ENV,
  });

  return (
    <Card className="summary-output-container">
      {isFetchingESGSummary ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : (
        <div ref={text}>
          {summarizedDocumentTitle && (
            <h3 className="summary-title">{summarizedDocumentTitle}</h3>
          )}
          {summary?.summary &&
            !!summary.summary.length &&
            summary.summary.map(
              (bulletSummary: ISummary, bulletSummaryIndex: number) => (
                <div
                  className="bullet-summary-container"
                  key={`bulletSummary_${bulletSummaryIndex}`}
                >
                  {IS_STG_ENV && (
                    <h5 className="section-title">{`${bulletSummary.title}`}</h5>
                  )}
                  <div className={sectionBodyClassNames}>
                    {bulletSummary.sentences.map((sentence, index: number) => (
                      <p
                        key={`sentence${index}`}
                        className={sectionSentenceClassNames}
                      >
                        {sentence}
                      </p>
                    ))}
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </Card>
  );
};

export default SummaryOutput;
