import { Skeleton } from '@/components/ui/skeleton';

import { useWorkflow } from '@/hooks/use-workflows';
import '../../../index.css';

import { WorkflowGraphInner } from './workflow-graph-inner';
import { lodashTitleCase } from '@/lib/string';
import { AlertCircleIcon } from 'lucide-react';
import { WorkflowNestedGraphProvider } from '../context/workflow-nested-graph-context';
import { ReactFlowProvider } from '@xyflow/react';

export function WorkflowGraph({ workflowId, baseUrl }: { workflowId: string; baseUrl: string }) {
  const { workflow, isLoading } = useWorkflow(workflowId, baseUrl);

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-[600px]" />
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="grid h-full place-items-center">
        <div className="flex flex-col items-center gap-2">
          <AlertCircleIcon />
          <div>We couldn&apos;t find {lodashTitleCase(workflowId)} workflow.</div>
        </div>
      </div>
    );
  }

  return (
    <WorkflowNestedGraphProvider>
      <ReactFlowProvider>
        <WorkflowGraphInner workflow={workflow} />
      </ReactFlowProvider>
    </WorkflowNestedGraphProvider>
  );
}
