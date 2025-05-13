
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock
} from "lucide-react";

export interface DataTableProps {
  data: any[];
  columns: { key: string; label: string }[];
  title: string;
  description?: string;
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  emptyMessage?: string;
}

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "completed":
    case "paid":
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> {status}</Badge>;
    case "pending":
    case "scheduled":
      return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> {status}</Badge>;
    case "cancelled":
    case "discharged":
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800"><XCircle className="h-3 w-3 mr-1" /> {status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const DataTable = ({
  data,
  columns,
  title,
  description,
  onView,
  onEdit,
  onDelete,
  emptyMessage = "No data available",
}: DataTableProps) => {
  return (
    <Table>
      {title && <TableCaption>{description || title}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length + 1} className="text-center py-8">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((item, index) => (
            <TableRow key={item.id || index}>
              {columns.map((column) => (
                <TableCell key={`${item.id}-${column.key}`}>
                  {column.key === "status" ? (
                    getStatusBadge(item[column.key])
                  ) : (
                    item[column.key]
                  )}
                </TableCell>
              ))}
              <TableCell className="text-right space-x-1">
                {onView && (
                  <Button variant="ghost" size="icon" onClick={() => onView(item)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                )}
                {onEdit && (
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
