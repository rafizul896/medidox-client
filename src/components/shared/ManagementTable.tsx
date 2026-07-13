import { Edit, Eye, Loader2, MoreHorizontal, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface IColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface IManagementTableProps<T> {
  data: T[];
  columns: IColumn<T>[];
  className?: string;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

function ManagementTable<T>({
  data,
  columns,
  className,
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage,
  isRefreshing,
}: IManagementTableProps<T>) {
  const hasAction = onView || onEdit || onDelete;

  return (
    <>
      <div className="rounded-lg border relative">
        {/* Refreshing Overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Refreshing...</p>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              {columns?.map((column, idx) => (
                <TableHead key={idx} className={className}>
                  {column.header}
                </TableHead>
              ))}

              {hasAction && <TableHead className="w-17.5">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasAction ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage || "No data found."}
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row) => (
                <TableRow key={getRowKey(row)}>
                  {columns?.map((column, idx) => {
                    return (
                      <TableCell key={idx} className={className}>
                        {typeof column.accessor === "function"
                          ? column.accessor(row)
                          : String(row[column.accessor])}
                      </TableCell>
                    );
                  })}

                  {hasAction && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(row)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(row)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(row)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ManagementTable;
