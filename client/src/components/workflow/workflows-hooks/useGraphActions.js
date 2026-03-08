import useGraphEmitter from "@/hooks/socket/workflow.socket/useGraphEmitter.js";
import { useReactFlow, addEdge } from "@xyflow/react";
import { useCallback } from "react";

export default function useGraphActions() {
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const {
    addNodeEmit,
    addNodesEmit,
    updateNodeEmit,
    removeNodeEmit,
    removeNodesEmit,

    addEdgeEmit,
    addEdgesEmit,
    updateEdgeEmit,
    removeEdgeEmit,
    removeEdgesEmit,
  } = useGraphEmitter();

  const addNode = useCallback(
    (node) => {
      setNodes((nodes) => [...nodes, node]);
      addNodeEmit(node);
    },
    [setNodes, addNodeEmit],
  );

  const addNodes = useCallback(
    (nodesArray) => {
      setNodes((nodes) => [...nodes, ...nodesArray]);
      addNodesEmit(nodesArray);
    },
    [setNodes, addNodesEmit],
  );

  const updateNode = useCallback(
    (id, data) => {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...data } } : n,
        ),
      );

      updateNodeEmit(id, data);
    },
    [setNodes, updateNodeEmit],
  );

  const removeNode = useCallback(
    (id) => {
      setNodes((nodes) => nodes.filter((n) => n.id !== id));

      setEdges((edges) =>
        edges.filter((e) => e.source !== id && e.target !== id),
      );

      removeNodeEmit(id);
    },
    [setNodes, setEdges, removeNodeEmit],
  );

  const removeNodes = useCallback(
    (ids) => {
      setNodes((nodes) => nodes.filter((n) => !ids.includes(n.id)));

      setEdges((edges) =>
        edges.filter((e) => !ids.includes(e.source) && !ids.includes(e.target)),
      );

      removeNodesEmit(ids);
    },
    [setNodes, setEdges, removeNodesEmit],
  );

  const addEdgeAction = useCallback(
    (edge) => {
      setEdges((edges) => addEdge(edge, edges));
      addEdgeEmit(edge);
    },
    [setEdges, addEdgeEmit],
  );

  const addEdges = useCallback(
    (edgesArray) => {
      setEdges((edges) => [...edges, ...edgesArray]);
      addEdgesEmit(edgesArray);
    },
    [setEdges, addEdgesEmit],
  );

  const updateEdge = useCallback(
    (id, data) => {
      setEdges((edges) =>
        edges.map((e) => (e.id === id ? { ...e, ...data } : e)),
      );

      updateEdgeEmit(id, data);
    },
    [setEdges, updateEdgeEmit],
  );

  const removeEdge = useCallback(
    (id) => {
      setEdges((edges) => edges.filter((e) => e.id !== id));
      removeEdgeEmit(id);
    },
    [setEdges, removeEdgeEmit],
  );

  const removeEdges = useCallback(
    (ids) => {
      setEdges((edges) => edges.filter((e) => !ids.includes(e.id)));
      removeEdgesEmit(ids);
    },
    [setEdges, removeEdgesEmit],
  );

  return {
    // nodes
    addNode,
    addNodes,
    updateNode,
    removeNode,
    removeNodes,

    // edges
    addEdgeAction,
    addEdges,
    updateEdge,
    removeEdge,
    removeEdges,

    // helpers
    getNodes,
    getEdges,
  };
}
