import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Part } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2Icon, X} from "lucide-react"

interface MeasurementsTableProps {
  measurements: Part[];
  editingPartId: number | null;
  editedValues: Record<string, number>;
  onValueChange: (measureId: string, value: string) => void;
  onStartEdit: (part: Part) => void;
  onSaveEdit: (part: Part) => void;
  onCancelEdit: () => void;
  isSaving: boolean;
}


export default function MeasurementsTable({
  measurements,
  editingPartId,
  editedValues,
  onValueChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  isSaving
}: MeasurementsTableProps) {
  return (
    <Card className=""
      style={{
      backgroundColor: 'var(--tg-secondary-bg-color)',
      color: 'var(--tg-text-color)',
      borderColor: 'var(--tg-secondary-bg-color)'
      }}
    >
      <CardHeader>
        <CardTitle>
          Measurements
        </CardTitle>
      </CardHeader>
      <CardContent> 
      {measurements.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part</TableHead>
              <TableHead>Measure</TableHead>
              <TableHead>Value</TableHead>
              <TableHead >Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.flatMap((part, partIndex) => [
              ...part.measures.map((measure, measureIndex) => (
                <TableRow key={`${part.clothingId}-${measure.id}`}
                    style={{
                      backgroundColor: measureIndex % 2 === 0 ? 'var(--tg-bg-color)' : 'var--tg-secondary-bg-color',
                      color: 'var(--tg-text-color)',
                      borderBottom: 'none'                     }}

                  >
                  <TableCell>
                    {measureIndex === 0 ? part.name : ''}
                  </TableCell>
                  <TableCell>{measure.name}</TableCell>
                  <TableCell>
                    {editingPartId === part.clothingId ? (
                      <Input

                        type="text"
                        value={editedValues[measure.id]}
                        onChange={(e) => onValueChange(measure.id.toString(), e.target.value)}
                        className="w-fit"
                      />
                    ) : (
                      measure.value
                    )}
                  </TableCell>
                  <TableCell className="text-start">
                    {measureIndex === 0 && editingPartId !== part.clothingId && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onStartEdit(part)}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )),
              // Action row for editing
              editingPartId === part.clothingId && (
                <TableRow key={`edit-actions-${partIndex}`}>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2} className="flex justify-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => onSaveEdit(part)}
                      disabled={isSaving}
                        style={{
                          borderColor: 'var(--tg-secondary-bg-color)',
                          backgroundColor: 'var(--tg-button-color)',
                          color: 'var(--tg-button-text-color)'

                        }}

                        >
                          {isSaving ? (
                        <>
                        <Loader2Icon className="animate-spin" />
                          Saving...
                        </>
                          ) : (
                            "Save"
                          )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={onCancelEdit}
                      disabled={isSaving}
                      style={{
                          borderColor: 'var(--tg-secondary-bg-color)',
                          backgroundColor: 'var(--tg-button-color)',
                          color: 'var(--tg-button-text-color)'

                        }}
                    >
                      <X />
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ),
              // Separator row
              <TableRow 
                key={`separator-${partIndex}`}
                className="border-b  h-2"
                  style={{
                  backgroundColor: 'var(--tg-secondary-bg-color)'
                }}
              >
                <TableCell colSpan={4} className="p-0"></TableCell>
              </TableRow>
            ])}
          </TableBody>
        </Table>
      ) : (
        <div className="border rounded-lg p-8 text-center text-gray-500">
          No measurements recorded for this order
        </div>
      )}
      </CardContent>
    </Card>
  );
}
