import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";
import sanitizeTagName from "src/components/utils/sanitizeTagName";
import TTag from "src/types/TTag";
import { v4 } from "uuid";
import styles from "./ApplicationFooter.module.scss";

interface IApplicationFooterProps {
  onTagCreate: (tag: TTag) => void;
}

const ApplicationFooter: React.FC<IApplicationFooterProps> = (props) => {
  const { onTagCreate } = props;
  const [tagName, setTagName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newName = sanitizeTagName(event.currentTarget.value);
      /**
       * Strict type checking!
       * we need to pass here empty string also
       */
      if (newName !== false) {
        setTagName(newName);
        setError("");
        return;
      }
      setError("Tag name cannot include =, #, comma");
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (!error) onTagCreate({ tag: tagName, uuid: v4() });
  }, [onTagCreate, tagName, error]);

  const disabled = tagName.length === 0;

  return (
    <div className={styles.footer}>
      <form className={styles.footer_inner} onSubmit={handleSubmit}>
        <Button disabled={disabled} htmlType="submit">
          Add new
        </Button>
        <Input
          value={tagName}
          onChange={handleInput}
          placeholder="input name of new tag please"
        />
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default ApplicationFooter;
