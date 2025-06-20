import { Card, Descriptions, Skeleton } from "antd";

const CardDetails = ({ items, title="Details" }) => {
  return (
    <Card size="default"
          title={title}>
      {items === null || items.length <= 0 &&
        <Skeleton />
      }

      {items != null && items.length > 0 &&
        <Descriptions items={items} />
      }
    </Card>
  );
};

export default CardDetails;