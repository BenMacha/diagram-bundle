var zn = Object.defineProperty;
var Fn = (e, t, n) => t in e ? zn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var P = (e, t, n) => Fn(e, typeof t != "symbol" ? t + "" : t, n);
import { jsxs as y, jsx as u, Fragment as H } from "react/jsx-runtime";
import { useRef as Q, useState as S, useMemo as V, useEffect as Z, memo as Yt, useLayoutEffect as ft, useCallback as Se } from "react";
import { createRoot as Vn } from "react-dom/client";
class mt extends Error {
  constructor(t, n) {
    super(t), this.status = n;
  }
}
function Gn(e, t, n = {}) {
  const r = Object.entries(n).filter(([, i]) => i !== void 0 && i !== "").map(([i, a]) => `${encodeURIComponent(i)}=${encodeURIComponent(a)}`).join("&");
  return `${e.replace(/\/+$/, "")}${t}${r ? `?${r}` : ""}`;
}
async function Ht(e, t, n, r) {
  if (!e.apiUrl && e.apiUrl !== "")
    throw new mt("apiUrl is not configured", 0);
  const i = typeof e.headers == "function" ? await e.headers() : e.headers || {}, o = await (e.fetch || fetch.bind(globalThis))(Gn(e.apiUrl, t, n), {
    headers: { Accept: r, ...i },
    credentials: e.credentials || "same-origin"
  });
  if (!o.ok) {
    let s = `HTTP ${o.status}`;
    try {
      const l = await o.clone().json();
      l && l.error && (s = l.error);
    } catch {
    }
    throw new mt(s, o.status);
  }
  return o;
}
async function nl(e) {
  return (await Ht(e, "/api/managers", {}, "application/json")).json();
}
async function qn(e, t) {
  return await (await Ht(e, "/api/schema", { em: t }, "application/json")).json();
}
function Bn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Wn = "\0", ue = "\0", pt = "";
let Un = class {
  constructor(t) {
    P(this, "_isDirected", !0);
    P(this, "_isMultigraph", !1);
    P(this, "_isCompound", !1);
    // Label for the graph itself
    P(this, "_label");
    // Defaults to be set when creating a new node
    P(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    P(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    P(this, "_nodes", {});
    // v -> edgeObj
    P(this, "_in", {});
    // u -> v -> Number
    P(this, "_preds", {});
    // v -> edgeObj
    P(this, "_out", {});
    // v -> w -> Number
    P(this, "_sucs", {});
    // e -> edgeObj
    P(this, "_edgeObjs", {});
    // e -> label
    P(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    P(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    P(this, "_edgeCount", 0);
    P(this, "_parent");
    P(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[ue] = {});
  }
  /* === Graph functions ========= */
  /**
   * Whether graph was created with 'directed' flag set to true or not.
   */
  isDirected() {
    return this._isDirected;
  }
  /**
   * Whether graph was created with 'multigraph' flag set to true or not.
   */
  isMultigraph() {
    return this._isMultigraph;
  }
  /**
   * Whether graph was created with 'compound' flag set to true or not.
   */
  isCompound() {
    return this._isCompound;
  }
  /**
   * Sets the label of the graph.
   */
  setGraph(t) {
    return this._label = t, this;
  }
  /**
   * Gets the graph label.
   */
  graph() {
    return this._label;
  }
  /* === Node functions ========== */
  /**
   * Sets the default node label. If newDefault is a function, it will be
   * invoked ach time when setting a label for a node. Otherwise, this label
   * will be assigned as default label in case if no label was specified while
   * setting a node.
   * Complexity: O(1).
   */
  setDefaultNodeLabel(t) {
    return this._defaultNodeLabelFn = t, typeof t != "function" && (this._defaultNodeLabelFn = () => t), this;
  }
  /**
   * Gets the number of nodes in the graph.
   * Complexity: O(1).
   */
  nodeCount() {
    return this._nodeCount;
  }
  /**
   * Gets all nodes of the graph. Note, the in case of compound graph subnodes are
   * not included in list.
   * Complexity: O(1).
   */
  nodes() {
    return Object.keys(this._nodes);
  }
  /**
   * Gets list of nodes without in-edges.
   * Complexity: O(|V|).
   */
  sources() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._in[n]).length === 0);
  }
  /**
   * Gets list of nodes without out-edges.
   * Complexity: O(|V|).
   */
  sinks() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._out[n]).length === 0);
  }
  /**
   * Invokes setNode method for each node in names list.
   * Complexity: O(|names|).
   */
  setNodes(t, n) {
    var r = arguments, i = this;
    return t.forEach(function(a) {
      r.length > 1 ? i.setNode(a, n) : i.setNode(a);
    }), this;
  }
  /**
   * Creates or updates the value for the node v in the graph. If label is supplied
   * it is set as the value for the node. If label is not supplied and the node was
   * created by this call then the default node label will be assigned.
   * Complexity: O(1).
   */
  setNode(t, n) {
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = ue, this._children[t] = {}, this._children[ue][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
  }
  /**
   * Gets the label of node with specified name.
   * Complexity: O(|V|).
   */
  node(t) {
    return this._nodes[t];
  }
  /**
   * Detects whether graph has a node with specified name or not.
   */
  hasNode(t) {
    return Object.hasOwn(this._nodes, t);
  }
  /**
   * Remove the node with the name from the graph or do nothing if the node is not in
   * the graph. If the node was removed this function also removes any incident
   * edges.
   * Complexity: O(1).
   */
  removeNode(t) {
    var n = this;
    if (Object.hasOwn(this._nodes, t)) {
      var r = (i) => n.removeEdge(n._edgeObjs[i]);
      delete this._nodes[t], this._isCompound && (this._removeFromParentsChildList(t), delete this._parent[t], this.children(t).forEach(function(i) {
        n.setParent(i);
      }), delete this._children[t]), Object.keys(this._in[t]).forEach(r), delete this._in[t], delete this._preds[t], Object.keys(this._out[t]).forEach(r), delete this._out[t], delete this._sucs[t], --this._nodeCount;
    }
    return this;
  }
  /**
   * Sets node p as a parent for node v if it is defined, or removes the
   * parent for v if p is undefined. Method throws an exception in case of
   * invoking it in context of noncompound graph.
   * Average-case complexity: O(1).
   */
  setParent(t, n) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (n === void 0)
      n = ue;
    else {
      n += "";
      for (var r = n; r !== void 0; r = this.parent(r))
        if (r === t)
          throw new Error("Setting " + n + " as parent of " + t + " would create a cycle");
      this.setNode(n);
    }
    return this.setNode(t), this._removeFromParentsChildList(t), this._parent[t] = n, this._children[n][t] = !0, this;
  }
  _removeFromParentsChildList(t) {
    delete this._children[this._parent[t]][t];
  }
  /**
   * Gets parent node for node v.
   * Complexity: O(1).
   */
  parent(t) {
    if (this._isCompound) {
      var n = this._parent[t];
      if (n !== ue)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = ue) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === ue)
        return this.nodes();
      if (this.hasNode(t))
        return [];
    }
  }
  /**
   * Return all nodes that are predecessors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  predecessors(t) {
    var n = this._preds[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are successors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  successors(t) {
    var n = this._sucs[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are predecessors or successors of the specified node or undefined if
   * node v is not in the graph.
   * Complexity: O(|V|).
   */
  neighbors(t) {
    var n = this.predecessors(t);
    if (n) {
      const i = new Set(n);
      for (var r of this.successors(t))
        i.add(r);
      return Array.from(i.values());
    }
  }
  isLeaf(t) {
    var n;
    return this.isDirected() ? n = this.successors(t) : n = this.neighbors(t), n.length === 0;
  }
  /**
   * Creates new graph with nodes filtered via filter. Edges incident to rejected node
   * are also removed. In case of compound graph, if parent is rejected by filter,
   * than all its children are rejected too.
   * Average-case complexity: O(|E|+|V|).
   */
  filterNodes(t) {
    var n = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    n.setGraph(this.graph());
    var r = this;
    Object.entries(this._nodes).forEach(function([o, s]) {
      t(o) && n.setNode(o, s);
    }), Object.values(this._edgeObjs).forEach(function(o) {
      n.hasNode(o.v) && n.hasNode(o.w) && n.setEdge(o, r.edge(o));
    });
    var i = {};
    function a(o) {
      var s = r.parent(o);
      return s === void 0 || n.hasNode(s) ? (i[o] = s, s) : s in i ? i[s] : a(s);
    }
    return this._isCompound && n.nodes().forEach((o) => n.setParent(o, a(o))), n;
  }
  /* === Edge functions ========== */
  /**
   * Sets the default edge label or factory function. This label will be
   * assigned as default label in case if no label was specified while setting
   * an edge or this function will be invoked each time when setting an edge
   * with no label specified and returned value * will be used as a label for edge.
   * Complexity: O(1).
   */
  setDefaultEdgeLabel(t) {
    return this._defaultEdgeLabelFn = t, typeof t != "function" && (this._defaultEdgeLabelFn = () => t), this;
  }
  /**
   * Gets the number of edges in the graph.
   * Complexity: O(1).
   */
  edgeCount() {
    return this._edgeCount;
  }
  /**
   * Gets edges of the graph. In case of compound graph subgraphs are not considered.
   * Complexity: O(|E|).
   */
  edges() {
    return Object.values(this._edgeObjs);
  }
  /**
   * Establish an edges path over the nodes in nodes list. If some edge is already
   * exists, it will update its label, otherwise it will create an edge between pair
   * of nodes with label provided or default label if no label provided.
   * Complexity: O(|nodes|).
   */
  setPath(t, n) {
    var r = this, i = arguments;
    return t.reduce(function(a, o) {
      return i.length > 1 ? r.setEdge(a, o, n) : r.setEdge(a, o), o;
    }), this;
  }
  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied
   * name. If label is supplied it is set as the value for the edge. If label is not
   * supplied and the edge was created by this call then the default edge label will
   * be assigned. The name parameter is only useful with multigraphs.
   */
  setEdge() {
    var t, n, r, i, a = !1, o = arguments[0];
    typeof o == "object" && o !== null && "v" in o ? (t = o.v, n = o.w, r = o.name, arguments.length === 2 && (i = arguments[1], a = !0)) : (t = o, n = arguments[1], r = arguments[3], arguments.length > 2 && (i = arguments[2], a = !0)), t = "" + t, n = "" + n, r !== void 0 && (r = "" + r);
    var s = _e(this._isDirected, t, n, r);
    if (Object.hasOwn(this._edgeLabels, s))
      return a && (this._edgeLabels[s] = i), this;
    if (r !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[s] = a ? i : this._defaultEdgeLabelFn(t, n, r);
    var l = Yn(this._isDirected, t, n, r);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[s] = l, bt(this._preds[n], t), bt(this._sucs[t], n), this._in[n][s] = l, this._out[t][s] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, r) {
    var i = arguments.length === 1 ? Ye(this._isDirected, arguments[0]) : _e(this._isDirected, t, n, r);
    return this._edgeLabels[i];
  }
  /**
   * Gets the label for the specified edge and converts it to an object.
   * Complexity: O(1)
   */
  edgeAsObj() {
    const t = this.edge(...arguments);
    return typeof t != "object" ? { label: t } : t;
  }
  /**
   * Detects whether the graph contains specified edge or not. No subgraphs are considered.
   * Complexity: O(1).
   */
  hasEdge(t, n, r) {
    var i = arguments.length === 1 ? Ye(this._isDirected, arguments[0]) : _e(this._isDirected, t, n, r);
    return Object.hasOwn(this._edgeLabels, i);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, r) {
    var i = arguments.length === 1 ? Ye(this._isDirected, arguments[0]) : _e(this._isDirected, t, n, r), a = this._edgeObjs[i];
    return a && (t = a.v, n = a.w, delete this._edgeLabels[i], delete this._edgeObjs[i], gt(this._preds[n], t), gt(this._sucs[t], n), delete this._in[n][i], delete this._out[t][i], this._edgeCount--), this;
  }
  /**
   * Return all edges that point to the node v. Optionally filters those edges down to just those
   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  inEdges(t, n) {
    var r = this._in[t];
    if (r) {
      var i = Object.values(r);
      return n ? i.filter((a) => a.v === n) : i;
    }
  }
  /**
   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  outEdges(t, n) {
    var r = this._out[t];
    if (r) {
      var i = Object.values(r);
      return n ? i.filter((a) => a.w === n) : i;
    }
  }
  /**
   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
   * down to just those between nodes v and w regardless of direction.
   * Complexity: O(|E|).
   */
  nodeEdges(t, n) {
    var r = this.inEdges(t, n);
    if (r)
      return r.concat(this.outEdges(t, n));
  }
};
function bt(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function gt(e, t) {
  --e[t] || delete e[t];
}
function _e(e, t, n, r) {
  var i = "" + t, a = "" + n;
  if (!e && i > a) {
    var o = i;
    i = a, a = o;
  }
  return i + pt + a + pt + (r === void 0 ? Wn : r);
}
function Yn(e, t, n, r) {
  var i = "" + t, a = "" + n;
  if (!e && i > a) {
    var o = i;
    i = a, a = o;
  }
  var s = { v: i, w: a };
  return r && (s.name = r), s;
}
function Ye(e, t) {
  return _e(e, t.v, t.w, t.name);
}
var at = Un, Hn = "2.2.4", Jn = {
  Graph: at,
  version: Hn
}, Xn = at, Kn = {
  write: Zn,
  read: tr
};
function Zn(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: Qn(e),
    edges: er(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function Qn(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), r = e.parent(t), i = { v: t };
    return n !== void 0 && (i.value = n), r !== void 0 && (i.parent = r), i;
  });
}
function er(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), r = { v: t.v, w: t.w };
    return t.name !== void 0 && (r.name = t.name), n !== void 0 && (r.value = n), r;
  });
}
function tr(e) {
  var t = new Xn(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var nr = rr;
function rr(e) {
  var t = {}, n = [], r;
  function i(a) {
    Object.hasOwn(t, a) || (t[a] = !0, r.push(a), e.successors(a).forEach(i), e.predecessors(a).forEach(i));
  }
  return e.nodes().forEach(function(a) {
    r = [], i(a), r.length && n.push(r);
  }), n;
}
let ir = class {
  constructor() {
    P(this, "_arr", []);
    P(this, "_keyIndices", {});
  }
  /**
   * Returns the number of elements in the queue. Takes `O(1)` time.
   */
  size() {
    return this._arr.length;
  }
  /**
   * Returns the keys that are in the queue. Takes `O(n)` time.
   */
  keys() {
    return this._arr.map(function(t) {
      return t.key;
    });
  }
  /**
   * Returns `true` if **key** is in the queue and `false` if not.
   */
  has(t) {
    return Object.hasOwn(this._keyIndices, t);
  }
  /**
   * Returns the priority for **key**. If **key** is not present in the queue
   * then this function returns `undefined`. Takes `O(1)` time.
   *
   * @param {Object} key
   */
  priority(t) {
    var n = this._keyIndices[t];
    if (n !== void 0)
      return this._arr[n].priority;
  }
  /**
   * Returns the key for the minimum element in this queue. If the queue is
   * empty this function throws an Error. Takes `O(1)` time.
   */
  min() {
    if (this.size() === 0)
      throw new Error("Queue underflow");
    return this._arr[0].key;
  }
  /**
   * Inserts a new key into the priority queue. If the key already exists in
   * the queue this function returns `false`; otherwise it will return `true`.
   * Takes `O(n)` time.
   *
   * @param {Object} key the key to add
   * @param {Number} priority the initial priority for the key
   */
  add(t, n) {
    var r = this._keyIndices;
    if (t = String(t), !Object.hasOwn(r, t)) {
      var i = this._arr, a = i.length;
      return r[t] = a, i.push({ key: t, priority: n }), this._decrease(a), !0;
    }
    return !1;
  }
  /**
   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
   */
  removeMin() {
    this._swap(0, this._arr.length - 1);
    var t = this._arr.pop();
    return delete this._keyIndices[t.key], this._heapify(0), t.key;
  }
  /**
   * Decreases the priority for **key** to **priority**. If the new priority is
   * greater than the previous priority, this function will throw an Error.
   *
   * @param {Object} key the key for which to raise priority
   * @param {Number} priority the new priority for the key
   */
  decrease(t, n) {
    var r = this._keyIndices[t];
    if (n > this._arr[r].priority)
      throw new Error("New priority is greater than current priority. Key: " + t + " Old: " + this._arr[r].priority + " New: " + n);
    this._arr[r].priority = n, this._decrease(r);
  }
  _heapify(t) {
    var n = this._arr, r = 2 * t, i = r + 1, a = t;
    r < n.length && (a = n[r].priority < n[a].priority ? r : a, i < n.length && (a = n[i].priority < n[a].priority ? i : a), a !== t && (this._swap(t, a), this._heapify(a)));
  }
  _decrease(t) {
    for (var n = this._arr, r = n[t].priority, i; t !== 0 && (i = t >> 1, !(n[i].priority < r)); )
      this._swap(t, i), t = i;
  }
  _swap(t, n) {
    var r = this._arr, i = this._keyIndices, a = r[t], o = r[n];
    r[t] = o, r[n] = a, i[o.key] = t, i[a.key] = n;
  }
};
var Jt = ir, ar = Jt, Xt = sr, or = () => 1;
function sr(e, t, n, r) {
  return lr(
    e,
    String(t),
    n || or,
    r || function(i) {
      return e.outEdges(i);
    }
  );
}
function lr(e, t, n, r) {
  var i = {}, a = new ar(), o, s, l = function(d) {
    var c = d.v !== o ? d.v : d.w, h = i[c], f = n(d), m = s.distance + f;
    if (f < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + d + " Weight: " + f);
    m < h.distance && (h.distance = m, h.predecessor = o, a.decrease(c, m));
  };
  for (e.nodes().forEach(function(d) {
    var c = d === t ? 0 : Number.POSITIVE_INFINITY;
    i[d] = { distance: c }, a.add(d, c);
  }); a.size() > 0 && (o = a.removeMin(), s = i[o], s.distance !== Number.POSITIVE_INFINITY); )
    r(o).forEach(l);
  return i;
}
var dr = Xt, cr = ur;
function ur(e, t, n) {
  return e.nodes().reduce(function(r, i) {
    return r[i] = dr(e, i, t, n), r;
  }, {});
}
var Kt = hr;
function hr(e) {
  var t = 0, n = [], r = {}, i = [];
  function a(o) {
    var s = r[o] = {
      onStack: !0,
      lowlink: t,
      index: t++
    };
    if (n.push(o), e.successors(o).forEach(function(c) {
      Object.hasOwn(r, c) ? r[c].onStack && (s.lowlink = Math.min(s.lowlink, r[c].index)) : (a(c), s.lowlink = Math.min(s.lowlink, r[c].lowlink));
    }), s.lowlink === s.index) {
      var l = [], d;
      do
        d = n.pop(), r[d].onStack = !1, l.push(d);
      while (o !== d);
      i.push(l);
    }
  }
  return e.nodes().forEach(function(o) {
    Object.hasOwn(r, o) || a(o);
  }), i;
}
var fr = Kt, mr = pr;
function pr(e) {
  return fr(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var br = vr, gr = () => 1;
function vr(e, t, n) {
  return yr(
    e,
    t || gr,
    n || function(r) {
      return e.outEdges(r);
    }
  );
}
function yr(e, t, n) {
  var r = {}, i = e.nodes();
  return i.forEach(function(a) {
    r[a] = {}, r[a][a] = { distance: 0 }, i.forEach(function(o) {
      a !== o && (r[a][o] = { distance: Number.POSITIVE_INFINITY });
    }), n(a).forEach(function(o) {
      var s = o.v === a ? o.w : o.v, l = t(o);
      r[a][s] = { distance: l, predecessor: a };
    });
  }), i.forEach(function(a) {
    var o = r[a];
    i.forEach(function(s) {
      var l = r[s];
      i.forEach(function(d) {
        var c = l[a], h = o[d], f = l[d], m = c.distance + h.distance;
        m < f.distance && (f.distance = m, f.predecessor = h.predecessor);
      });
    });
  }), r;
}
function Zt(e) {
  var t = {}, n = {}, r = [];
  function i(a) {
    if (Object.hasOwn(n, a))
      throw new et();
    Object.hasOwn(t, a) || (n[a] = !0, t[a] = !0, e.predecessors(a).forEach(i), delete n[a], r.push(a));
  }
  if (e.sinks().forEach(i), Object.keys(t).length !== e.nodeCount())
    throw new et();
  return r;
}
class et extends Error {
  constructor() {
    super(...arguments);
  }
}
var Qt = Zt;
Zt.CycleException = et;
var vt = Qt, xr = wr;
function wr(e) {
  try {
    vt(e);
  } catch (t) {
    if (t instanceof vt.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var en = kr;
function kr(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var r = e.isDirected() ? (s) => e.successors(s) : (s) => e.neighbors(s), i = n === "post" ? _r : Er, a = [], o = {};
  return t.forEach((s) => {
    if (!e.hasNode(s))
      throw new Error("Graph does not have node: " + s);
    i(s, r, o, a);
  }), a;
}
function _r(e, t, n, r) {
  for (var i = [[e, !1]]; i.length > 0; ) {
    var a = i.pop();
    a[1] ? r.push(a[0]) : Object.hasOwn(n, a[0]) || (n[a[0]] = !0, i.push([a[0], !0]), tn(t(a[0]), (o) => i.push([o, !1])));
  }
}
function Er(e, t, n, r) {
  for (var i = [e]; i.length > 0; ) {
    var a = i.pop();
    Object.hasOwn(n, a) || (n[a] = !0, r.push(a), tn(t(a), (o) => i.push(o)));
  }
}
function tn(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Nr = en, $r = Mr;
function Mr(e, t) {
  return Nr(e, t, "post");
}
var Or = en, Cr = Ir;
function Ir(e, t) {
  return Or(e, t, "pre");
}
var jr = at, Lr = Jt, Sr = Tr;
function Tr(e, t) {
  var n = new jr(), r = {}, i = new Lr(), a;
  function o(l) {
    var d = l.v === a ? l.w : l.v, c = i.priority(d);
    if (c !== void 0) {
      var h = t(l);
      h < c && (r[d] = a, i.decrease(d, h));
    }
  }
  if (e.nodeCount() === 0)
    return n;
  e.nodes().forEach(function(l) {
    i.add(l, Number.POSITIVE_INFINITY), n.setNode(l);
  }), i.decrease(e.nodes()[0], 0);
  for (var s = !1; i.size() > 0; ) {
    if (a = i.removeMin(), Object.hasOwn(r, a))
      n.setEdge(a, r[a]);
    else {
      if (s)
        throw new Error("Input graph is not connected: " + e);
      s = !0;
    }
    e.nodeEdges(a).forEach(o);
  }
  return n;
}
var Rr = {
  components: nr,
  dijkstra: Xt,
  dijkstraAll: cr,
  findCycles: mr,
  floydWarshall: br,
  isAcyclic: xr,
  postorder: $r,
  preorder: Cr,
  prim: Sr,
  tarjan: Kt,
  topsort: Qt
}, yt = Jn, ee = {
  Graph: yt.Graph,
  json: Kn,
  alg: Rr,
  version: yt.version
};
let Dr = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return xt(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && xt(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, r = n._prev;
    for (; r !== n; )
      t.push(JSON.stringify(r, Ar)), r = r._prev;
    return "[" + t.join(", ") + "]";
  }
};
function xt(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Ar(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Pr = Dr;
let zr = ee.Graph, Fr = Pr;
var Vr = qr;
let Gr = () => 1;
function qr(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = Wr(e, t || Gr);
  return Br(n.graph, n.buckets, n.zeroIdx).flatMap((i) => e.outEdges(i.v, i.w));
}
function Br(e, t, n) {
  let r = [], i = t[t.length - 1], a = t[0], o;
  for (; e.nodeCount(); ) {
    for (; o = a.dequeue(); )
      He(e, t, n, o);
    for (; o = i.dequeue(); )
      He(e, t, n, o);
    if (e.nodeCount()) {
      for (let s = t.length - 2; s > 0; --s)
        if (o = t[s].dequeue(), o) {
          r = r.concat(He(e, t, n, o, !0));
          break;
        }
    }
  }
  return r;
}
function He(e, t, n, r, i) {
  let a = i ? [] : void 0;
  return e.inEdges(r.v).forEach((o) => {
    let s = e.edge(o), l = e.node(o.v);
    i && a.push({ v: o.v, w: o.w }), l.out -= s, tt(t, n, l);
  }), e.outEdges(r.v).forEach((o) => {
    let s = e.edge(o), l = o.w, d = e.node(l);
    d.in -= s, tt(t, n, d);
  }), e.removeNode(r.v), a;
}
function Wr(e, t) {
  let n = new zr(), r = 0, i = 0;
  e.nodes().forEach((s) => {
    n.setNode(s, { v: s, in: 0, out: 0 });
  }), e.edges().forEach((s) => {
    let l = n.edge(s.v, s.w) || 0, d = t(s), c = l + d;
    n.setEdge(s.v, s.w, c), i = Math.max(i, n.node(s.v).out += d), r = Math.max(r, n.node(s.w).in += d);
  });
  let a = Ur(i + r + 3).map(() => new Fr()), o = r + 1;
  return n.nodes().forEach((s) => {
    tt(a, o, n.node(s));
  }), { graph: n, buckets: a, zeroIdx: o };
}
function tt(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Ur(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let nn = ee.Graph;
var z = {
  addBorderNode: ti,
  addDummyNode: rn,
  applyWithChunking: Pe,
  asNonCompoundGraph: Hr,
  buildLayerMatrix: Zr,
  intersectRect: Kr,
  mapValues: li,
  maxRank: on,
  normalizeRanks: Qr,
  notime: ai,
  partition: ri,
  pick: si,
  predecessorWeights: Xr,
  range: ln,
  removeEmptyRanks: ei,
  simplify: Yr,
  successorWeights: Jr,
  time: ii,
  uniqueId: sn,
  zipObject: ot
};
function rn(e, t, n, r) {
  for (var i = r; e.hasNode(i); )
    i = sn(r);
  return n.dummy = t, e.setNode(i, n), i;
}
function Yr(e) {
  let t = new nn().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let r = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, i = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: r.weight + i.weight,
      minlen: Math.max(r.minlen, i.minlen)
    });
  }), t;
}
function Hr(e) {
  let t = new nn({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Jr(e) {
  let t = e.nodes().map((n) => {
    let r = {};
    return e.outEdges(n).forEach((i) => {
      r[i.w] = (r[i.w] || 0) + e.edge(i).weight;
    }), r;
  });
  return ot(e.nodes(), t);
}
function Xr(e) {
  let t = e.nodes().map((n) => {
    let r = {};
    return e.inEdges(n).forEach((i) => {
      r[i.v] = (r[i.v] || 0) + e.edge(i).weight;
    }), r;
  });
  return ot(e.nodes(), t);
}
function Kr(e, t) {
  let n = e.x, r = e.y, i = t.x - n, a = t.y - r, o = e.width / 2, s = e.height / 2;
  if (!i && !a)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, d;
  return Math.abs(a) * o > Math.abs(i) * s ? (a < 0 && (s = -s), l = s * i / a, d = s) : (i < 0 && (o = -o), l = o, d = o * a / i), { x: n + l, y: r + d };
}
function Zr(e) {
  let t = ln(on(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let r = e.node(n), i = r.rank;
    i !== void 0 && (t[i][r.order] = n);
  }), t;
}
function Qr(e) {
  let t = e.nodes().map((r) => {
    let i = e.node(r).rank;
    return i === void 0 ? Number.MAX_VALUE : i;
  }), n = Pe(Math.min, t);
  e.nodes().forEach((r) => {
    let i = e.node(r);
    Object.hasOwn(i, "rank") && (i.rank -= n);
  });
}
function ei(e) {
  let t = e.nodes().map((o) => e.node(o).rank), n = Pe(Math.min, t), r = [];
  e.nodes().forEach((o) => {
    let s = e.node(o).rank - n;
    r[s] || (r[s] = []), r[s].push(o);
  });
  let i = 0, a = e.graph().nodeRankFactor;
  Array.from(r).forEach((o, s) => {
    o === void 0 && s % a !== 0 ? --i : o !== void 0 && i && o.forEach((l) => e.node(l).rank += i);
  });
}
function ti(e, t, n, r) {
  let i = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (i.rank = n, i.order = r), rn(e, "border", i, t);
}
function ni(e, t = an) {
  const n = [];
  for (let r = 0; r < e.length; r += t) {
    const i = e.slice(r, r + t);
    n.push(i);
  }
  return n;
}
const an = 65535;
function Pe(e, t) {
  if (t.length > an) {
    const n = ni(t);
    return e.apply(null, n.map((r) => e.apply(null, r)));
  } else
    return e.apply(null, t);
}
function on(e) {
  const n = e.nodes().map((r) => {
    let i = e.node(r).rank;
    return i === void 0 ? Number.MIN_VALUE : i;
  });
  return Pe(Math.max, n);
}
function ri(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((r) => {
    t(r) ? n.lhs.push(r) : n.rhs.push(r);
  }), n;
}
function ii(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function ai(e, t) {
  return t();
}
let oi = 0;
function sn(e) {
  var t = ++oi;
  return e + ("" + t);
}
function ln(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let r = (a) => a < t;
  n < 0 && (r = (a) => t < a);
  const i = [];
  for (let a = e; r(a); a += n)
    i.push(a);
  return i;
}
function si(e, t) {
  const n = {};
  for (const r of t)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function li(e, t) {
  let n = t;
  return typeof t == "string" && (n = (r) => r[t]), Object.entries(e).reduce((r, [i, a]) => (r[i] = n(a, i), r), {});
}
function ot(e, t) {
  return e.reduce((n, r, i) => (n[r] = t[i], n), {});
}
let di = Vr, ci = z.uniqueId;
var ui = {
  run: hi,
  undo: mi
};
function hi(e) {
  (e.graph().acyclicer === "greedy" ? di(e, n(e)) : fi(e)).forEach((r) => {
    let i = e.edge(r);
    e.removeEdge(r), i.forwardName = r.name, i.reversed = !0, e.setEdge(r.w, r.v, i, ci("rev"));
  });
  function n(r) {
    return (i) => r.edge(i).weight;
  }
}
function fi(e) {
  let t = [], n = {}, r = {};
  function i(a) {
    Object.hasOwn(r, a) || (r[a] = !0, n[a] = !0, e.outEdges(a).forEach((o) => {
      Object.hasOwn(n, o.w) ? t.push(o) : i(o.w);
    }), delete n[a]);
  }
  return e.nodes().forEach(i), t;
}
function mi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let r = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, r);
    }
  });
}
let pi = z;
var bi = {
  run: gi,
  undo: yi
};
function gi(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => vi(e, t));
}
function vi(e, t) {
  let n = t.v, r = e.node(n).rank, i = t.w, a = e.node(i).rank, o = t.name, s = e.edge(t), l = s.labelRank;
  if (a === r + 1) return;
  e.removeEdge(t);
  let d, c, h;
  for (h = 0, ++r; r < a; ++h, ++r)
    s.points = [], c = {
      width: 0,
      height: 0,
      edgeLabel: s,
      edgeObj: t,
      rank: r
    }, d = pi.addDummyNode(e, "edge", c, "_d"), r === l && (c.width = s.width, c.height = s.height, c.dummy = "edge-label", c.labelpos = s.labelpos), e.setEdge(n, d, { weight: s.weight }, o), h === 0 && e.graph().dummyChains.push(d), n = d;
  e.setEdge(n, i, { weight: s.weight }, o);
}
function yi(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), r = n.edgeLabel, i;
    for (e.setEdge(n.edgeObj, r); n.dummy; )
      i = e.successors(t)[0], e.removeNode(t), r.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (r.x = n.x, r.y = n.y, r.width = n.width, r.height = n.height), t = i, n = e.node(t);
  });
}
const { applyWithChunking: xi } = z;
var ze = {
  longestPath: wi,
  slack: ki
};
function wi(e) {
  var t = {};
  function n(r) {
    var i = e.node(r);
    if (Object.hasOwn(t, r))
      return i.rank;
    t[r] = !0;
    let a = e.outEdges(r).map((s) => s == null ? Number.POSITIVE_INFINITY : n(s.w) - e.edge(s).minlen);
    var o = xi(Math.min, a);
    return o === Number.POSITIVE_INFINITY && (o = 0), i.rank = o;
  }
  e.sources().forEach(n);
}
function ki(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var _i = ee.Graph, Re = ze.slack, dn = Ei;
function Ei(e) {
  var t = new _i({ directed: !1 }), n = e.nodes()[0], r = e.nodeCount();
  t.setNode(n, {});
  for (var i, a; Ni(t, e) < r; )
    i = $i(t, e), a = t.hasNode(i.v) ? Re(e, i) : -Re(e, i), Mi(t, e, a);
  return t;
}
function Ni(e, t) {
  function n(r) {
    t.nodeEdges(r).forEach((i) => {
      var a = i.v, o = r === a ? i.w : a;
      !e.hasNode(o) && !Re(t, i) && (e.setNode(o, {}), e.setEdge(r, o, {}), n(o));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function $i(e, t) {
  return t.edges().reduce((r, i) => {
    let a = Number.POSITIVE_INFINITY;
    return e.hasNode(i.v) !== e.hasNode(i.w) && (a = Re(t, i)), a < r[0] ? [a, i] : r;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Mi(e, t, n) {
  e.nodes().forEach((r) => t.node(r).rank += n);
}
var Oi = dn, wt = ze.slack, Ci = ze.longestPath, Ii = ee.alg.preorder, ji = ee.alg.postorder, Li = z.simplify, Si = me;
me.initLowLimValues = lt;
me.initCutValues = st;
me.calcCutValue = cn;
me.leaveEdge = hn;
me.enterEdge = fn;
me.exchangeEdges = mn;
function me(e) {
  e = Li(e), Ci(e);
  var t = Oi(e);
  lt(t), st(t, e);
  for (var n, r; n = hn(t); )
    r = fn(t, e, n), mn(t, e, n, r);
}
function st(e, t) {
  var n = ji(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((r) => Ti(e, t, r));
}
function Ti(e, t, n) {
  var r = e.node(n), i = r.parent;
  e.edge(n, i).cutvalue = cn(e, t, n);
}
function cn(e, t, n) {
  var r = e.node(n), i = r.parent, a = !0, o = t.edge(n, i), s = 0;
  return o || (a = !1, o = t.edge(i, n)), s = o.weight, t.nodeEdges(n).forEach((l) => {
    var d = l.v === n, c = d ? l.w : l.v;
    if (c !== i) {
      var h = d === a, f = t.edge(l).weight;
      if (s += h ? f : -f, Di(e, n, c)) {
        var m = e.edge(n, c).cutvalue;
        s += h ? -m : m;
      }
    }
  }), s;
}
function lt(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), un(e, {}, 1, t);
}
function un(e, t, n, r, i) {
  var a = n, o = e.node(r);
  return t[r] = !0, e.neighbors(r).forEach((s) => {
    Object.hasOwn(t, s) || (n = un(e, t, n, s, r));
  }), o.low = a, o.lim = n++, i ? o.parent = i : delete o.parent, n;
}
function hn(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function fn(e, t, n) {
  var r = n.v, i = n.w;
  t.hasEdge(r, i) || (r = n.w, i = n.v);
  var a = e.node(r), o = e.node(i), s = a, l = !1;
  a.lim > o.lim && (s = o, l = !0);
  var d = t.edges().filter((c) => l === kt(e, e.node(c.v), s) && l !== kt(e, e.node(c.w), s));
  return d.reduce((c, h) => wt(t, h) < wt(t, c) ? h : c);
}
function mn(e, t, n, r) {
  var i = n.v, a = n.w;
  e.removeEdge(i, a), e.setEdge(r.v, r.w, {}), lt(e), st(e, t), Ri(e, t);
}
function Ri(e, t) {
  var n = e.nodes().find((i) => !t.node(i).parent), r = Ii(e, n);
  r = r.slice(1), r.forEach((i) => {
    var a = e.node(i).parent, o = t.edge(i, a), s = !1;
    o || (o = t.edge(a, i), s = !0), t.node(i).rank = t.node(a).rank + (s ? o.minlen : -o.minlen);
  });
}
function Di(e, t, n) {
  return e.hasEdge(t, n);
}
function kt(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Ai = ze, pn = Ai.longestPath, Pi = dn, zi = Si, Fi = Vi;
function Vi(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      _t(e);
      break;
    case "tight-tree":
      qi(e);
      break;
    case "longest-path":
      Gi(e);
      break;
    case "none":
      break;
    default:
      _t(e);
  }
}
var Gi = pn;
function qi(e) {
  pn(e), Pi(e);
}
function _t(e) {
  zi(e);
}
var Bi = Wi;
function Wi(e) {
  let t = Yi(e);
  e.graph().dummyChains.forEach((n) => {
    let r = e.node(n), i = r.edgeObj, a = Ui(e, t, i.v, i.w), o = a.path, s = a.lca, l = 0, d = o[l], c = !0;
    for (; n !== i.w; ) {
      if (r = e.node(n), c) {
        for (; (d = o[l]) !== s && e.node(d).maxRank < r.rank; )
          l++;
        d === s && (c = !1);
      }
      if (!c) {
        for (; l < o.length - 1 && e.node(d = o[l + 1]).minRank <= r.rank; )
          l++;
        d = o[l];
      }
      e.setParent(n, d), n = e.successors(n)[0];
    }
  });
}
function Ui(e, t, n, r) {
  let i = [], a = [], o = Math.min(t[n].low, t[r].low), s = Math.max(t[n].lim, t[r].lim), l, d;
  l = n;
  do
    l = e.parent(l), i.push(l);
  while (l && (t[l].low > o || s > t[l].lim));
  for (d = l, l = r; (l = e.parent(l)) !== d; )
    a.push(l);
  return { path: i.concat(a.reverse()), lca: d };
}
function Yi(e) {
  let t = {}, n = 0;
  function r(i) {
    let a = n;
    e.children(i).forEach(r), t[i] = { low: a, lim: n++ };
  }
  return e.children().forEach(r), t;
}
let De = z;
var Hi = {
  run: Ji,
  cleanup: Zi
};
function Ji(e) {
  let t = De.addDummyNode(e, "root", {}, "_root"), n = Xi(e), r = Object.values(n), i = De.applyWithChunking(Math.max, r) - 1, a = 2 * i + 1;
  e.graph().nestingRoot = t, e.edges().forEach((s) => e.edge(s).minlen *= a);
  let o = Ki(e) + 1;
  e.children().forEach((s) => bn(e, t, a, o, i, n, s)), e.graph().nodeRankFactor = a;
}
function bn(e, t, n, r, i, a, o) {
  let s = e.children(o);
  if (!s.length) {
    o !== t && e.setEdge(t, o, { weight: 0, minlen: n });
    return;
  }
  let l = De.addBorderNode(e, "_bt"), d = De.addBorderNode(e, "_bb"), c = e.node(o);
  e.setParent(l, o), c.borderTop = l, e.setParent(d, o), c.borderBottom = d, s.forEach((h) => {
    bn(e, t, n, r, i, a, h);
    let f = e.node(h), m = f.borderTop ? f.borderTop : h, k = f.borderBottom ? f.borderBottom : h, N = f.borderTop ? r : 2 * r, _ = m !== k ? 1 : i - a[o] + 1;
    e.setEdge(l, m, {
      weight: N,
      minlen: _,
      nestingEdge: !0
    }), e.setEdge(k, d, {
      weight: N,
      minlen: _,
      nestingEdge: !0
    });
  }), e.parent(o) || e.setEdge(t, l, { weight: 0, minlen: i + a[o] });
}
function Xi(e) {
  var t = {};
  function n(r, i) {
    var a = e.children(r);
    a && a.length && a.forEach((o) => n(o, i + 1)), t[r] = i;
  }
  return e.children().forEach((r) => n(r, 1)), t;
}
function Ki(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function Zi(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var r = e.edge(n);
    r.nestingEdge && e.removeEdge(n);
  });
}
let Qi = z;
var ea = ta;
function ta(e) {
  function t(n) {
    let r = e.children(n), i = e.node(n);
    if (r.length && r.forEach(t), Object.hasOwn(i, "minRank")) {
      i.borderLeft = [], i.borderRight = [];
      for (let a = i.minRank, o = i.maxRank + 1; a < o; ++a)
        Et(e, "borderLeft", "_bl", n, i, a), Et(e, "borderRight", "_br", n, i, a);
    }
  }
  e.children().forEach(t);
}
function Et(e, t, n, r, i, a) {
  let o = { width: 0, height: 0, rank: a, borderType: t }, s = i[t][a - 1], l = Qi.addDummyNode(e, "border", o, n);
  i[t][a] = l, e.setParent(l, r), s && e.setEdge(s, l, { weight: 1 });
}
var na = {
  adjust: ra,
  undo: ia
};
function ra(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && gn(e);
}
function ia(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && aa(e), (t === "lr" || t === "rl") && (oa(e), gn(e));
}
function gn(e) {
  e.nodes().forEach((t) => Nt(e.node(t))), e.edges().forEach((t) => Nt(e.edge(t)));
}
function Nt(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function aa(e) {
  e.nodes().forEach((t) => Je(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Je), Object.hasOwn(n, "y") && Je(n);
  });
}
function Je(e) {
  e.y = -e.y;
}
function oa(e) {
  e.nodes().forEach((t) => Xe(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Xe), Object.hasOwn(n, "x") && Xe(n);
  });
}
function Xe(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let $t = z;
var sa = la;
function la(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), r = n.map((l) => e.node(l).rank), i = $t.applyWithChunking(Math.max, r), a = $t.range(i + 1).map(() => []);
  function o(l) {
    if (t[l]) return;
    t[l] = !0;
    let d = e.node(l);
    a[d.rank].push(l), e.successors(l).forEach(o);
  }
  return n.sort((l, d) => e.node(l).rank - e.node(d).rank).forEach(o), a;
}
let da = z.zipObject;
var ca = ua;
function ua(e, t) {
  let n = 0;
  for (let r = 1; r < t.length; ++r)
    n += ha(e, t[r - 1], t[r]);
  return n;
}
function ha(e, t, n) {
  let r = da(n, n.map((d, c) => c)), i = t.flatMap((d) => e.outEdges(d).map((c) => ({ pos: r[c.w], weight: e.edge(c).weight })).sort((c, h) => c.pos - h.pos)), a = 1;
  for (; a < n.length; ) a <<= 1;
  let o = 2 * a - 1;
  a -= 1;
  let s = new Array(o).fill(0), l = 0;
  return i.forEach((d) => {
    let c = d.pos + a;
    s[c] += d.weight;
    let h = 0;
    for (; c > 0; )
      c % 2 && (h += s[c + 1]), c = c - 1 >> 1, s[c] += d.weight;
    l += d.weight * h;
  }), l;
}
var fa = ma;
function ma(e, t = []) {
  return t.map((n) => {
    let r = e.inEdges(n);
    if (r.length) {
      let i = r.reduce((a, o) => {
        let s = e.edge(o), l = e.node(o.v);
        return {
          sum: a.sum + s.weight * l.order,
          weight: a.weight + s.weight
        };
      }, { sum: 0, weight: 0 });
      return {
        v: n,
        barycenter: i.sum / i.weight,
        weight: i.weight
      };
    } else
      return { v: n };
  });
}
let pa = z;
var ba = ga;
function ga(e, t) {
  let n = {};
  e.forEach((i, a) => {
    let o = n[i.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [i.v],
      i: a
    };
    i.barycenter !== void 0 && (o.barycenter = i.barycenter, o.weight = i.weight);
  }), t.edges().forEach((i) => {
    let a = n[i.v], o = n[i.w];
    a !== void 0 && o !== void 0 && (o.indegree++, a.out.push(n[i.w]));
  });
  let r = Object.values(n).filter((i) => !i.indegree);
  return va(r);
}
function va(e) {
  let t = [];
  function n(i) {
    return (a) => {
      a.merged || (a.barycenter === void 0 || i.barycenter === void 0 || a.barycenter >= i.barycenter) && ya(i, a);
    };
  }
  function r(i) {
    return (a) => {
      a.in.push(i), --a.indegree === 0 && e.push(a);
    };
  }
  for (; e.length; ) {
    let i = e.pop();
    t.push(i), i.in.reverse().forEach(n(i)), i.out.forEach(r(i));
  }
  return t.filter((i) => !i.merged).map((i) => pa.pick(i, ["vs", "i", "barycenter", "weight"]));
}
function ya(e, t) {
  let n = 0, r = 0;
  e.weight && (n += e.barycenter * e.weight, r += e.weight), t.weight && (n += t.barycenter * t.weight, r += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / r, e.weight = r, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let xa = z;
var wa = ka;
function ka(e, t) {
  let n = xa.partition(e, (c) => Object.hasOwn(c, "barycenter")), r = n.lhs, i = n.rhs.sort((c, h) => h.i - c.i), a = [], o = 0, s = 0, l = 0;
  r.sort(_a(!!t)), l = Mt(a, i, l), r.forEach((c) => {
    l += c.vs.length, a.push(c.vs), o += c.barycenter * c.weight, s += c.weight, l = Mt(a, i, l);
  });
  let d = { vs: a.flat(!0) };
  return s && (d.barycenter = o / s, d.weight = s), d;
}
function Mt(e, t, n) {
  let r;
  for (; t.length && (r = t[t.length - 1]).i <= n; )
    t.pop(), e.push(r.vs), n++;
  return n;
}
function _a(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let Ea = fa, Na = ba, $a = wa;
var Ma = vn;
function vn(e, t, n, r) {
  let i = e.children(t), a = e.node(t), o = a ? a.borderLeft : void 0, s = a ? a.borderRight : void 0, l = {};
  o && (i = i.filter((f) => f !== o && f !== s));
  let d = Ea(e, i);
  d.forEach((f) => {
    if (e.children(f.v).length) {
      let m = vn(e, f.v, n, r);
      l[f.v] = m, Object.hasOwn(m, "barycenter") && Ca(f, m);
    }
  });
  let c = Na(d, n);
  Oa(c, l);
  let h = $a(c, r);
  if (o && (h.vs = [o, h.vs, s].flat(!0), e.predecessors(o).length)) {
    let f = e.node(e.predecessors(o)[0]), m = e.node(e.predecessors(s)[0]);
    Object.hasOwn(h, "barycenter") || (h.barycenter = 0, h.weight = 0), h.barycenter = (h.barycenter * h.weight + f.order + m.order) / (h.weight + 2), h.weight += 2;
  }
  return h;
}
function Oa(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((r) => t[r] ? t[r].vs : r);
  });
}
function Ca(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let Ia = ee.Graph, ja = z;
var La = Sa;
function Sa(e, t, n, r) {
  r || (r = e.nodes());
  let i = Ta(e), a = new Ia({ compound: !0 }).setGraph({ root: i }).setDefaultNodeLabel((o) => e.node(o));
  return r.forEach((o) => {
    let s = e.node(o), l = e.parent(o);
    (s.rank === t || s.minRank <= t && t <= s.maxRank) && (a.setNode(o), a.setParent(o, l || i), e[n](o).forEach((d) => {
      let c = d.v === o ? d.w : d.v, h = a.edge(c, o), f = h !== void 0 ? h.weight : 0;
      a.setEdge(c, o, { weight: e.edge(d).weight + f });
    }), Object.hasOwn(s, "minRank") && a.setNode(o, {
      borderLeft: s.borderLeft[t],
      borderRight: s.borderRight[t]
    }));
  }), a;
}
function Ta(e) {
  for (var t; e.hasNode(t = ja.uniqueId("_root")); ) ;
  return t;
}
var Ra = Da;
function Da(e, t, n) {
  let r = {}, i;
  n.forEach((a) => {
    let o = e.parent(a), s, l;
    for (; o; ) {
      if (s = e.parent(o), s ? (l = r[s], r[s] = o) : (l = i, i = o), l && l !== o) {
        t.setEdge(l, o);
        return;
      }
      o = s;
    }
  });
}
let Aa = sa, Pa = ca, za = Ma, Fa = La, Va = Ra, Ga = ee.Graph, Te = z;
var qa = yn;
function yn(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, yn);
    return;
  }
  let n = Te.maxRank(e), r = Ot(e, Te.range(1, n + 1), "inEdges"), i = Ot(e, Te.range(n - 1, -1, -1), "outEdges"), a = Aa(e);
  if (Ct(e, a), t && t.disableOptimalOrderHeuristic)
    return;
  let o = Number.POSITIVE_INFINITY, s;
  for (let l = 0, d = 0; d < 4; ++l, ++d) {
    Ba(l % 2 ? r : i, l % 4 >= 2), a = Te.buildLayerMatrix(e);
    let c = Pa(e, a);
    c < o && (d = 0, s = Object.assign({}, a), o = c);
  }
  Ct(e, s);
}
function Ot(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = (a, o) => {
    r.has(a) || r.set(a, []), r.get(a).push(o);
  };
  for (const a of e.nodes()) {
    const o = e.node(a);
    if (typeof o.rank == "number" && i(o.rank, a), typeof o.minRank == "number" && typeof o.maxRank == "number")
      for (let s = o.minRank; s <= o.maxRank; s++)
        s !== o.rank && i(s, a);
  }
  return t.map(function(a) {
    return Fa(e, a, n, r.get(a) || []);
  });
}
function Ba(e, t) {
  let n = new Ga();
  e.forEach(function(r) {
    let i = r.graph().root, a = za(r, i, n, t);
    a.vs.forEach((o, s) => r.node(o).order = s), Va(r, n, a.vs);
  });
}
function Ct(e, t) {
  Object.values(t).forEach((n) => n.forEach((r, i) => e.node(r).order = i));
}
let Wa = ee.Graph, ie = z;
var Ua = {
  positionX: ro
};
function Ya(e, t) {
  let n = {};
  function r(i, a) {
    let o = 0, s = 0, l = i.length, d = a[a.length - 1];
    return a.forEach((c, h) => {
      let f = Ja(e, c), m = f ? e.node(f).order : l;
      (f || c === d) && (a.slice(s, h + 1).forEach((k) => {
        e.predecessors(k).forEach((N) => {
          let _ = e.node(N), b = _.order;
          (b < o || m < b) && !(_.dummy && e.node(k).dummy) && xn(n, N, k);
        });
      }), s = h + 1, o = m);
    }), a;
  }
  return t.length && t.reduce(r), n;
}
function Ha(e, t) {
  let n = {};
  function r(a, o, s, l, d) {
    let c;
    ie.range(o, s).forEach((h) => {
      c = a[h], e.node(c).dummy && e.predecessors(c).forEach((f) => {
        let m = e.node(f);
        m.dummy && (m.order < l || m.order > d) && xn(n, f, c);
      });
    });
  }
  function i(a, o) {
    let s = -1, l, d = 0;
    return o.forEach((c, h) => {
      if (e.node(c).dummy === "border") {
        let f = e.predecessors(c);
        f.length && (l = e.node(f[0]).order, r(o, d, h, s, l), d = h, s = l);
      }
      r(o, d, o.length, l, a.length);
    }), o;
  }
  return t.length && t.reduce(i), n;
}
function Ja(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function xn(e, t, n) {
  if (t > n) {
    let i = t;
    t = n, n = i;
  }
  let r = e[t];
  r || (e[t] = r = {}), r[n] = !0;
}
function Xa(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function Ka(e, t, n, r) {
  let i = {}, a = {}, o = {};
  return t.forEach((s) => {
    s.forEach((l, d) => {
      i[l] = l, a[l] = l, o[l] = d;
    });
  }), t.forEach((s) => {
    let l = -1;
    s.forEach((d) => {
      let c = r(d);
      if (c.length) {
        c = c.sort((f, m) => o[f] - o[m]);
        let h = (c.length - 1) / 2;
        for (let f = Math.floor(h), m = Math.ceil(h); f <= m; ++f) {
          let k = c[f];
          a[d] === d && l < o[k] && !Xa(n, d, k) && (a[k] = d, a[d] = i[d] = i[k], l = o[k]);
        }
      }
    });
  }), { root: i, align: a };
}
function Za(e, t, n, r, i) {
  let a = {}, o = Qa(e, t, n, i), s = i ? "borderLeft" : "borderRight";
  function l(h, f) {
    let m = o.nodes(), k = m.pop(), N = {};
    for (; k; )
      N[k] ? h(k) : (N[k] = !0, m.push(k), m = m.concat(f(k))), k = m.pop();
  }
  function d(h) {
    a[h] = o.inEdges(h).reduce((f, m) => Math.max(f, a[m.v] + o.edge(m)), 0);
  }
  function c(h) {
    let f = o.outEdges(h).reduce((k, N) => Math.min(k, a[N.w] - o.edge(N)), Number.POSITIVE_INFINITY), m = e.node(h);
    f !== Number.POSITIVE_INFINITY && m.borderType !== s && (a[h] = Math.max(a[h], f));
  }
  return l(d, o.predecessors.bind(o)), l(c, o.successors.bind(o)), Object.keys(r).forEach((h) => a[h] = a[n[h]]), a;
}
function Qa(e, t, n, r) {
  let i = new Wa(), a = e.graph(), o = io(a.nodesep, a.edgesep, r);
  return t.forEach((s) => {
    let l;
    s.forEach((d) => {
      let c = n[d];
      if (i.setNode(c), l) {
        var h = n[l], f = i.edge(h, c);
        i.setEdge(h, c, Math.max(o(e, d, l), f || 0));
      }
      l = d;
    });
  }), i;
}
function eo(e, t) {
  return Object.values(t).reduce((n, r) => {
    let i = Number.NEGATIVE_INFINITY, a = Number.POSITIVE_INFINITY;
    Object.entries(r).forEach(([s, l]) => {
      let d = ao(e, s) / 2;
      i = Math.max(l + d, i), a = Math.min(l - d, a);
    });
    const o = i - a;
    return o < n[0] && (n = [o, r]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function to(e, t) {
  let n = Object.values(t), r = ie.applyWithChunking(Math.min, n), i = ie.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((a) => {
    ["l", "r"].forEach((o) => {
      let s = a + o, l = e[s];
      if (l === t) return;
      let d = Object.values(l), c = r - ie.applyWithChunking(Math.min, d);
      o !== "l" && (c = i - ie.applyWithChunking(Math.max, d)), c && (e[s] = ie.mapValues(l, (h) => h + c));
    });
  });
}
function no(e, t) {
  return ie.mapValues(e.ul, (n, r) => {
    if (t)
      return e[t.toLowerCase()][r];
    {
      let i = Object.values(e).map((a) => a[r]).sort((a, o) => a - o);
      return (i[1] + i[2]) / 2;
    }
  });
}
function ro(e) {
  let t = ie.buildLayerMatrix(e), n = Object.assign(
    Ya(e, t),
    Ha(e, t)
  ), r = {}, i;
  ["u", "d"].forEach((o) => {
    i = o === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((s) => {
      s === "r" && (i = i.map((h) => Object.values(h).reverse()));
      let l = (o === "u" ? e.predecessors : e.successors).bind(e), d = Ka(e, i, n, l), c = Za(
        e,
        i,
        d.root,
        d.align,
        s === "r"
      );
      s === "r" && (c = ie.mapValues(c, (h) => -h)), r[o + s] = c;
    });
  });
  let a = eo(e, r);
  return to(r, a), no(r, e.graph().align);
}
function io(e, t, n) {
  return (r, i, a) => {
    let o = r.node(i), s = r.node(a), l = 0, d;
    if (l += o.width / 2, Object.hasOwn(o, "labelpos"))
      switch (o.labelpos.toLowerCase()) {
        case "l":
          d = -o.width / 2;
          break;
        case "r":
          d = o.width / 2;
          break;
      }
    if (d && (l += n ? d : -d), d = 0, l += (o.dummy ? t : e) / 2, l += (s.dummy ? t : e) / 2, l += s.width / 2, Object.hasOwn(s, "labelpos"))
      switch (s.labelpos.toLowerCase()) {
        case "l":
          d = s.width / 2;
          break;
        case "r":
          d = -s.width / 2;
          break;
      }
    return d && (l += n ? d : -d), d = 0, l;
  };
}
function ao(e, t) {
  return e.node(t).width;
}
let wn = z, oo = Ua.positionX;
var so = lo;
function lo(e) {
  e = wn.asNonCompoundGraph(e), co(e), Object.entries(oo(e)).forEach(([t, n]) => e.node(t).x = n);
}
function co(e) {
  let t = wn.buildLayerMatrix(e), n = e.graph().ranksep, r = 0;
  t.forEach((i) => {
    const a = i.reduce((o, s) => {
      const l = e.node(s).height;
      return o > l ? o : l;
    }, 0);
    i.forEach((o) => e.node(o).y = r + a / 2), r += a + n;
  });
}
let It = ui, jt = bi, uo = Fi, ho = z.normalizeRanks, fo = Bi, mo = z.removeEmptyRanks, Lt = Hi, po = ea, St = na, bo = qa, go = so, X = z, vo = ee.Graph;
var yo = xo;
function xo(e, t) {
  let n = t && t.debugTiming ? X.time : X.notime;
  n("layout", () => {
    let r = n("  buildLayoutGraph", () => Io(e));
    n("  runLayout", () => wo(r, n, t)), n("  updateInputGraph", () => ko(e, r));
  });
}
function wo(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => jo(e)), t("    removeSelfEdges", () => Fo(e)), t("    acyclic", () => It.run(e)), t("    nestingGraph.run", () => Lt.run(e)), t("    rank", () => uo(X.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Lo(e)), t("    removeEmptyRanks", () => mo(e)), t("    nestingGraph.cleanup", () => Lt.cleanup(e)), t("    normalizeRanks", () => ho(e)), t("    assignRankMinMax", () => So(e)), t("    removeEdgeLabelProxies", () => To(e)), t("    normalize.run", () => jt.run(e)), t("    parentDummyChains", () => fo(e)), t("    addBorderSegments", () => po(e)), t("    order", () => bo(e, n)), t("    insertSelfEdges", () => Vo(e)), t("    adjustCoordinateSystem", () => St.adjust(e)), t("    position", () => go(e)), t("    positionSelfEdges", () => Go(e)), t("    removeBorderNodes", () => zo(e)), t("    normalize.undo", () => jt.undo(e)), t("    fixupEdgeLabelCoords", () => Ao(e)), t("    undoCoordinateSystem", () => St.undo(e)), t("    translateGraph", () => Ro(e)), t("    assignNodeIntersects", () => Do(e)), t("    reversePoints", () => Po(e)), t("    acyclic.undo", () => It.undo(e));
}
function ko(e, t) {
  e.nodes().forEach((n) => {
    let r = e.node(n), i = t.node(n);
    r && (r.x = i.x, r.y = i.y, r.rank = i.rank, t.children(n).length && (r.width = i.width, r.height = i.height));
  }), e.edges().forEach((n) => {
    let r = e.edge(n), i = t.edge(n);
    r.points = i.points, Object.hasOwn(i, "x") && (r.x = i.x, r.y = i.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let _o = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Eo = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, No = ["acyclicer", "ranker", "rankdir", "align"], $o = ["width", "height", "rank"], Tt = { width: 0, height: 0 }, Mo = ["minlen", "weight", "width", "height", "labeloffset"], Oo = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Co = ["labelpos"];
function Io(e) {
  let t = new vo({ multigraph: !0, compound: !0 }), n = Ze(e.graph());
  return t.setGraph(Object.assign(
    {},
    Eo,
    Ke(n, _o),
    X.pick(n, No)
  )), e.nodes().forEach((r) => {
    let i = Ze(e.node(r));
    const a = Ke(i, $o);
    Object.keys(Tt).forEach((o) => {
      a[o] === void 0 && (a[o] = Tt[o]);
    }), t.setNode(r, a), t.setParent(r, e.parent(r));
  }), e.edges().forEach((r) => {
    let i = Ze(e.edge(r));
    t.setEdge(r, Object.assign(
      {},
      Oo,
      Ke(i, Mo),
      X.pick(i, Co)
    ));
  }), t;
}
function jo(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let r = e.edge(n);
    r.minlen *= 2, r.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? r.width += r.labeloffset : r.height += r.labeloffset);
  });
}
function Lo(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let r = e.node(t.v), a = { rank: (e.node(t.w).rank - r.rank) / 2 + r.rank, e: t };
      X.addDummyNode(e, "edge-proxy", a, "_ep");
    }
  });
}
function So(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let r = e.node(n);
    r.borderTop && (r.minRank = e.node(r.borderTop).rank, r.maxRank = e.node(r.borderBottom).rank, t = Math.max(t, r.maxRank));
  }), e.graph().maxRank = t;
}
function To(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function Ro(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, r = Number.POSITIVE_INFINITY, i = 0, a = e.graph(), o = a.marginx || 0, s = a.marginy || 0;
  function l(d) {
    let c = d.x, h = d.y, f = d.width, m = d.height;
    t = Math.min(t, c - f / 2), n = Math.max(n, c + f / 2), r = Math.min(r, h - m / 2), i = Math.max(i, h + m / 2);
  }
  e.nodes().forEach((d) => l(e.node(d))), e.edges().forEach((d) => {
    let c = e.edge(d);
    Object.hasOwn(c, "x") && l(c);
  }), t -= o, r -= s, e.nodes().forEach((d) => {
    let c = e.node(d);
    c.x -= t, c.y -= r;
  }), e.edges().forEach((d) => {
    let c = e.edge(d);
    c.points.forEach((h) => {
      h.x -= t, h.y -= r;
    }), Object.hasOwn(c, "x") && (c.x -= t), Object.hasOwn(c, "y") && (c.y -= r);
  }), a.width = n - t + o, a.height = i - r + s;
}
function Do(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), r = e.node(t.v), i = e.node(t.w), a, o;
    n.points ? (a = n.points[0], o = n.points[n.points.length - 1]) : (n.points = [], a = i, o = r), n.points.unshift(X.intersectRect(r, a)), n.points.push(X.intersectRect(i, o));
  });
}
function Ao(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (Object.hasOwn(n, "x"))
      switch ((n.labelpos === "l" || n.labelpos === "r") && (n.width -= n.labeloffset), n.labelpos) {
        case "l":
          n.x -= n.width / 2 + n.labeloffset;
          break;
        case "r":
          n.x += n.width / 2 + n.labeloffset;
          break;
      }
  });
}
function Po(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function zo(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), r = e.node(n.borderTop), i = e.node(n.borderBottom), a = e.node(n.borderLeft[n.borderLeft.length - 1]), o = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(o.x - a.x), n.height = Math.abs(i.y - r.y), n.x = a.x + n.width / 2, n.y = r.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Fo(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Vo(e) {
  var t = X.buildLayerMatrix(e);
  t.forEach((n) => {
    var r = 0;
    n.forEach((i, a) => {
      var o = e.node(i);
      o.order = a + r, (o.selfEdges || []).forEach((s) => {
        X.addDummyNode(e, "selfedge", {
          width: s.label.width,
          height: s.label.height,
          rank: o.rank,
          order: a + ++r,
          e: s.e,
          label: s.label
        }, "_se");
      }), delete o.selfEdges;
    });
  });
}
function Go(e) {
  e.nodes().forEach((t) => {
    var n = e.node(t);
    if (n.dummy === "selfedge") {
      var r = e.node(n.e.v), i = r.x + r.width / 2, a = r.y, o = n.x - i, s = r.height / 2;
      e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [
        { x: i + 2 * o / 3, y: a - s },
        { x: i + 5 * o / 6, y: a - s },
        { x: i + o, y: a },
        { x: i + 5 * o / 6, y: a + s },
        { x: i + 2 * o / 3, y: a + s }
      ], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
function Ke(e, t) {
  return X.mapValues(X.pick(e, t), Number);
}
function Ze(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, r]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = r;
  }), t;
}
let qo = z, Bo = ee.Graph;
var Wo = {
  debugOrdering: Uo
};
function Uo(e) {
  let t = qo.buildLayerMatrix(e), n = new Bo({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((r) => {
    n.setNode(r, { label: r }), n.setParent(r, "layer" + e.node(r).rank);
  }), e.edges().forEach((r) => n.setEdge(r.v, r.w, {}, r.name)), t.forEach((r, i) => {
    let a = "layer" + i;
    n.setNode(a, { rank: "same" }), r.reduce((o, s) => (n.setEdge(o, s, { style: "invis" }), s));
  }), n;
}
var Yo = "1.1.8", Ho = {
  graphlib: ee,
  layout: yo,
  debug: Wo,
  util: {
    time: z.time,
    notime: z.notime
  },
  version: Yo
};
const Rt = /* @__PURE__ */ Bn(Ho), ne = 46, Ae = 24, nt = 8, Jo = 190, Xo = 440, Ko = (e) => e.type === "ManyToMany" || e.type === "OneToMany";
function Zo(e, t, n, r) {
  if (r === "none") return [];
  const i = [];
  for (const a of e.fields) {
    if (e.kind === "enum") {
      i.push({ key: `v:${a.name}`, label: a.name, type: "", kind: "field", nullable: !1, unique: !1 });
      continue;
    }
    r === "keys" && !a.id && !a.unique || i.push({
      key: `f:${a.name}`,
      label: a.name,
      type: a.length ? `${a.type}(${a.length})` : a.type,
      kind: a.id ? "pk" : "field",
      nullable: a.nullable,
      unique: a.unique
    });
  }
  for (const a of t)
    if (a.source === e.id) {
      const o = n.get(a.target) || a.target;
      i.push({
        key: `r:${a.id}`,
        label: a.field,
        type: Ko(a) ? `${o}[]` : o,
        kind: "fk",
        nullable: a.nullable,
        unique: a.type === "OneToOne",
        relation: a.id
      });
    }
  if (r === "all") {
    for (const a of t)
      if (a.target === e.id && a.inverseField && a.source !== a.target) {
        const o = n.get(a.source) || a.source;
        i.push({
          key: `i:${a.id}`,
          label: a.inverseField,
          type: a.type === "OneToOne" ? o : `${o}[]`,
          kind: "collection",
          nullable: !0,
          unique: !1,
          relation: a.id
        });
      }
  }
  return i;
}
function Qo(e, t, n) {
  let r = Math.max(n(e.name, "title") + 56, n(e.table || e.kind, "type") + 40);
  for (const a of t)
    r = Math.max(r, n(a.label, "row") + n(a.type, "type") + 70);
  r = Math.min(Xo, Math.max(Jo, Math.ceil(r)));
  const i = ne + t.length * Ae + (t.length ? nt : 0);
  return { width: r, height: i };
}
function es(e, t, n) {
  const r = new Set(e.map((c) => c.id)), i = /* @__PURE__ */ new Set(), a = [];
  for (const c of t)
    c.source !== c.target && r.has(c.source) && r.has(c.target) && (a.push([c.target, c.source]), i.add(c.source), i.add(c.target));
  for (const c of e)
    c.entity.parent && r.has(c.entity.parent) && (a.push([c.entity.parent, c.id]), i.add(c.id), i.add(c.entity.parent));
  const o = /* @__PURE__ */ new Map();
  let s = 0, l = 0;
  if (i.size) {
    const c = new Rt.graphlib.Graph({ multigraph: !0 });
    c.setGraph({ rankdir: n, nodesep: 42, ranksep: 110, edgesep: 18, marginx: 0, marginy: 0 }), c.setDefaultEdgeLabel(() => ({}));
    for (const h of e)
      i.has(h.id) && c.setNode(h.id, { width: h.width, height: h.height });
    a.forEach(([h, f], m) => c.setEdge(h, f, {}, `e${m}`)), Rt.layout(c);
    for (const h of c.nodes()) {
      const f = c.node(h), m = f.x - f.width / 2, k = f.y - f.height / 2;
      o.set(h, { x: m, y: k }), s = Math.max(s, m + f.width), l = Math.max(l, k + f.height);
    }
  }
  const d = e.filter((c) => !i.has(c.id));
  if (d.length) {
    const h = i.size ? l + 120 : 0, f = Math.max(s, 1400);
    let m = 0, k = h, N = 0;
    for (const _ of d)
      m > 0 && m + _.width > f && (m = 0, k += N + 36, N = 0), o.set(_.id, { x: m, y: k }), m += _.width + 36, N = Math.max(N, _.height);
  }
  return o;
}
function Dt(e, t, n = 1) {
  return { x: e.x + t.x * n, y: e.y + t.y * n };
}
function At(e, t, n, r, i) {
  const a = 1 - i;
  return {
    x: a * a * a * e.x + 3 * a * a * i * t.x + 3 * a * i * i * n.x + i * i * i * r.x,
    y: a * a * a * e.y + 3 * a * a * i * t.y + 3 * a * i * i * n.y + i * i * i * r.y
  };
}
function Qe(e, t) {
  if (!t) return null;
  const n = e.rows.findIndex((r) => r.key === t);
  return n === -1 ? null : e.y + ne + n * Ae + Ae / 2;
}
function ts(e, t) {
  var s;
  const n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = (l, d) => l < d ? `${l}|${d}` : `${d}|${l}`, o = [];
  for (const l of t)
    e.has(l.source) && e.has(l.target) && o.push({ id: l.id, relation: l, source: l.source, target: l.target, inheritance: !1 });
  e.forEach((l) => {
    l.entity.parent && e.has(l.entity.parent) && o.push({ id: `extends:${l.id}`, relation: null, source: l.id, target: l.entity.parent, inheritance: !0 });
  });
  for (const l of o) {
    const d = a(l.source, l.target);
    r.set(d, (r.get(d) || 0) + 1);
  }
  for (const l of o) {
    const d = e.get(l.source), c = e.get(l.target), h = a(l.source, l.target), f = i.get(h) || 0;
    i.set(h, f + 1);
    const m = r.get(h) || 1, k = (f - (m - 1) / 2) * 14;
    if (d === c) {
      const C = (s = Qe(d, l.relation ? `r:${l.relation.id}` : void 0)) != null ? s : d.y + ne / 2, I = { x: d.x + d.width, y: C }, E = { x: d.x + d.width, y: d.y + ne / 2 + 4 }, F = 46 + f * 12, x = { x: I.x + F, y: I.y }, $ = { x: E.x + F, y: E.y - 10 };
      n.push({
        ...l,
        d: `M${I.x},${I.y} C${x.x},${x.y} ${$.x},${$.y} ${E.x},${E.y}`,
        start: I,
        end: E,
        startDir: { x: 1, y: 0 },
        endDir: { x: 1, y: 0 },
        mid: At(I, x, $, E, 0.5)
      });
      continue;
    }
    let N, _, b, M;
    if (c.x >= d.x + d.width + 24 || c.x + c.width + 24 <= d.x) {
      const C = c.x >= d.x + d.width, I = Qe(d, l.relation ? `r:${l.relation.id}` : void 0), E = Qe(c, l.relation ? `i:${l.relation.id}` : void 0);
      N = { x: C ? d.x + d.width : d.x, y: I != null ? I : d.y + Math.min(d.height / 2, ne / 2 + k + 6) }, _ = { x: C ? c.x : c.x + c.width, y: E != null ? E : c.y + ne / 2 + (I === null ? k : 0) }, b = { x: C ? 1 : -1, y: 0 }, M = { x: C ? -1 : 1, y: 0 };
    } else {
      const C = c.y + c.height / 2 > d.y + d.height / 2, I = d.x + d.width / 2 + k, E = c.x + c.width / 2 + k;
      N = { x: I, y: C ? d.y + d.height : d.y }, _ = { x: E, y: C ? c.y : c.y + c.height }, b = { x: 0, y: C ? 1 : -1 }, M = { x: 0, y: C ? -1 : 1 };
    }
    const j = Math.hypot(_.x - N.x, _.y - N.y), D = Math.max(36, Math.min(160, j * 0.45)), w = Dt(N, b, D), g = Dt(_, M, D);
    n.push({
      ...l,
      d: `M${N.x},${N.y} C${w.x},${w.y} ${g.x},${g.y} ${_.x},${_.y}`,
      start: N,
      end: _,
      startDir: b,
      endDir: M,
      mid: At(N, w, g, _, 0.5)
    });
  }
  return n;
}
function kn(e) {
  let t = 1 / 0, n = 1 / 0, r = -1 / 0, i = -1 / 0;
  for (const a of e)
    t = Math.min(t, a.x), n = Math.min(n, a.y), r = Math.max(r, a.x + a.width), i = Math.max(i, a.y + a.height);
  return t === 1 / 0 ? { x: 0, y: 0, width: 0, height: 0 } : { x: t, y: n, width: r - t, height: i - n };
}
function Pt(e, t, n, r) {
  const i = -t.y, a = t.x, o = (d, c) => ({ x: e.x + t.x * d + i * c, y: e.y + t.y * d + a * c }), s = (d, c) => `M${d.x},${d.y} L${c.x},${c.y}`, l = [];
  return n === "many" ? (l.push(s(o(12, 0), o(0, -6)), s(o(12, 0), o(0, 0)), s(o(12, 0), o(0, 6))), l.push(r ? "" : s(o(16, -6), o(16, 6)))) : (l.push(s(o(7, -6), o(7, 6))), r || l.push(s(o(12, -6), o(12, 6)))), l.filter(Boolean).join(" ");
}
function zt(e, t, n) {
  const r = n === "many" ? 20 : 17;
  return { x: e.x + t.x * r, y: e.y + t.y * r };
}
const ns = {
  font: "var(--_font)",
  mono: "var(--_mono)",
  surface: "var(--_surface)",
  surface2: "var(--_surface-2)",
  border: "var(--_border)",
  text: "var(--_text)",
  muted: "var(--_muted)",
  accent: "var(--_accent)",
  edge: "var(--_edge)",
  canvas: "var(--_canvas)"
};
function rs(e) {
  const t = getComputedStyle(e), n = (r, i) => t.getPropertyValue(r).trim() || i;
  return {
    font: n("--_font", "Arial, sans-serif"),
    mono: n("--_mono", "monospace"),
    surface: n("--_surface", "#fff"),
    surface2: n("--_surface-2", "#f1f3f6"),
    border: n("--_border", "#e3e6eb"),
    text: n("--_text", "#161a22"),
    muted: n("--_muted", "#687083"),
    accent: n("--_accent", "#4f5bd5"),
    edge: n("--_edge", "#9aa3b5"),
    grid: n("--_grid", "#d7dbe2"),
    canvas: n("--_canvas", "#f3f4f7")
  };
}
function _n(e) {
  return `
.bmd-node { cursor: pointer; }
.bmd-node-bg { fill: ${e.surface}; stroke: ${e.border}; stroke-width: 1; }
.bmd-node-shadow { fill: #000; opacity: .05; }
.bmd-node-head { fill: ${e.surface2}; }
.bmd-node-strip { stroke: none; }
.bmd-node-title { font: 650 13.5px ${e.font}; fill: ${e.text}; }
.bmd-node-sub { font: 400 11px ${e.mono}; fill: ${e.muted}; }
.bmd-node-kind { font: 600 9.5px ${e.font}; fill: ${e.muted}; letter-spacing: .06em; text-transform: uppercase; }
.bmd-node-sep { stroke: ${e.border}; stroke-width: 1; }
.bmd-row-name { font: 400 12px ${e.font}; fill: ${e.text}; }
.bmd-row-name.is-pk { font-weight: 650; }
.bmd-row-name.is-nullable { fill: ${e.muted}; }
.bmd-row-type { font: 400 11px ${e.mono}; fill: ${e.muted}; }
.bmd-row-type.is-ref { fill: ${e.accent}; }
.bmd-row-hover { fill: transparent; }
.bmd-row-icon { fill: none; stroke: ${e.muted}; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.bmd-row-icon.is-pk { stroke: #d39b1a; }
.bmd-row-icon.is-ref { stroke: ${e.accent}; }
.bmd-node.is-selected .bmd-node-bg { stroke: ${e.accent}; stroke-width: 2; }
.bmd-node.is-dim { opacity: .28; }
.bmd-node:hover .bmd-node-bg { stroke: ${e.accent}; }
.bmd-edge { fill: none; stroke: ${e.edge}; stroke-width: 1.4; }
.bmd-edge-glyph { fill: none; stroke: ${e.edge}; stroke-width: 1.4; stroke-linecap: round; }
.bmd-edge-circle { fill: ${e.canvas}; stroke: ${e.edge}; stroke-width: 1.4; }
.bmd-edge.is-inheritance { stroke-dasharray: 5 4; }
.bmd-edge-arrow { fill: ${e.canvas}; stroke: ${e.edge}; stroke-width: 1.4; stroke-linejoin: round; }
.bmd-link.is-active .bmd-edge, .bmd-link.is-active .bmd-edge-glyph { stroke: ${e.accent}; stroke-width: 2; }
.bmd-link.is-active .bmd-edge-circle, .bmd-link.is-active .bmd-edge-arrow { stroke: ${e.accent}; }
.bmd-link.is-dim { opacity: .15; }
.bmd-edge-label { font: 500 11px ${e.font}; fill: ${e.text}; }
.bmd-edge-label-bg { fill: ${e.surface}; stroke: ${e.border}; }
.bmd-hit { fill: none; stroke: transparent; stroke-width: 12; cursor: pointer; }
`;
}
function is(e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) t = t * 31 + e.charCodeAt(r) | 0;
  return `hsl(${Math.abs(t) % 360} 62% 52%)`;
}
function Ee(e, t, n = "text/plain") {
  const r = typeof e == "string" ? new Blob([e], { type: `${n};charset=utf-8` }) : e, i = URL.createObjectURL(r), a = document.createElement("a");
  a.href = i, a.download = t, a.rel = "noopener", a.style.display = "none", document.body.appendChild(a), a.click(), a.remove(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
}
function En(e, t, n) {
  const r = rs(n), i = 40, a = kn(t), o = Math.ceil(a.width + i * 2), s = Math.ceil(a.height + i * 2), l = e.cloneNode(!0);
  l.setAttribute("xmlns", "http://www.w3.org/2000/svg"), l.setAttribute("width", String(o)), l.setAttribute("height", String(s)), l.setAttribute("viewBox", `0 0 ${o} ${s}`), l.removeAttribute("class");
  const d = l.querySelector("style");
  d && (d.textContent = _n(r)), l.querySelectorAll(".bmd-grid-bg, defs, .bmd-hit").forEach((f) => f.remove()), l.querySelectorAll(".is-dim, .is-active, .is-selected").forEach((f) => f.classList.remove("is-dim", "is-active", "is-selected")), l.querySelectorAll('[fill="var(--_accent)"]').forEach((f) => f.setAttribute("fill", r.accent));
  const c = l.querySelector(".bmd-viewport");
  c && c.setAttribute("transform", `translate(${i - a.x} ${i - a.y})`);
  const h = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  return h.setAttribute("width", "100%"), h.setAttribute("height", "100%"), h.setAttribute("fill", r.canvas), l.insertBefore(h, c), { markup: `<?xml version="1.0" encoding="UTF-8"?>
${new XMLSerializer().serializeToString(l)}`, width: o, height: s };
}
function as(e, t, n, r) {
  Ee(En(e, t, n).markup, r, "image/svg+xml");
}
function os(e, t, n, r) {
  const { markup: i, width: a, height: o } = En(e, t, n), s = Math.max(0.5, Math.min(2, 16e3 / Math.max(a, o)));
  return new Promise((l, d) => {
    const c = new Image();
    c.onload = () => {
      const h = document.createElement("canvas");
      h.width = Math.round(a * s), h.height = Math.round(o * s);
      const f = h.getContext("2d");
      if (!f) return d(new Error("Canvas not supported"));
      f.scale(s, s), f.drawImage(c, 0, 0), h.toBlob((m) => {
        m ? (Ee(m, r), l()) : d(new Error("PNG export failed"));
      }, "image/png");
    }, c.onerror = () => d(new Error("PNG export failed")), c.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(i)}`;
  });
}
const ss = {
  entities: "Entities",
  search: "Search entities…",
  showAll: "Show all",
  hideAll: "Hide all",
  noResult: "No entity matches",
  manager: "Entity manager",
  detail: "Detail",
  detailAll: "Fields",
  detailKeys: "Keys",
  detailNone: "Names",
  direction: "Layout",
  horizontal: "Horizontal",
  vertical: "Vertical",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  fit: "Fit to screen",
  relayout: "Reset layout",
  export: "Export",
  exportSvg: "Image (SVG)",
  exportPng: "Image (PNG)",
  exportJdl: "JDL file",
  exportJson: "JSON schema",
  jdl: "JDL",
  jdlTitle: "JDL editor",
  jdlHint: "Edit the JDL: the diagram updates live. Import a .jdl / .jh file or go back to the database schema.",
  apply: "Apply",
  import: "Import",
  reset: "Database",
  download: "Download",
  close: "Close",
  theme: "Theme",
  toggleSidebar: "Toggle entity list",
  loading: "Loading schema…",
  error: "Unable to load the schema",
  retry: "Retry",
  empty: "No entity in this entity manager.",
  table: "Table",
  kind: "Kind",
  parent: "Extends",
  fields: "Fields",
  relations: "Relations",
  outgoing: "Owning side",
  incoming: "Referenced by",
  focus: "Only neighbours",
  unfocus: "Show everything",
  copy: "Copy",
  copied: "Copied",
  nullable: "nullable",
  unique: "unique",
  primary: "primary key",
  jdlSource: "Imported JDL",
  visible: "visible",
  shortcuts: "Scroll to zoom · drag to pan · drag an entity to move it",
  parseError: "Line"
}, ls = {
  entities: "Entités",
  search: "Rechercher une entité…",
  showAll: "Tout afficher",
  hideAll: "Tout masquer",
  noResult: "Aucune entité ne correspond",
  manager: "Entity manager",
  detail: "Détail",
  detailAll: "Champs",
  detailKeys: "Clés",
  detailNone: "Noms",
  direction: "Disposition",
  horizontal: "Horizontale",
  vertical: "Verticale",
  zoomIn: "Zoom avant",
  zoomOut: "Zoom arrière",
  fit: "Ajuster à l’écran",
  relayout: "Réinitialiser la disposition",
  export: "Exporter",
  exportSvg: "Image (SVG)",
  exportPng: "Image (PNG)",
  exportJdl: "Fichier JDL",
  exportJson: "Schéma JSON",
  jdl: "JDL",
  jdlTitle: "Éditeur JDL",
  jdlHint: "Modifiez le JDL : le diagramme se met à jour en direct. Importez un fichier .jdl / .jh ou revenez au schéma de la base.",
  apply: "Appliquer",
  import: "Importer",
  reset: "Base",
  download: "Télécharger",
  close: "Fermer",
  theme: "Thème",
  toggleSidebar: "Afficher / masquer la liste",
  loading: "Chargement du schéma…",
  error: "Impossible de charger le schéma",
  retry: "Réessayer",
  empty: "Aucune entité dans cet entity manager.",
  table: "Table",
  kind: "Type",
  parent: "Hérite de",
  fields: "Champs",
  relations: "Relations",
  outgoing: "Côté propriétaire",
  incoming: "Référencée par",
  focus: "Voisins uniquement",
  unfocus: "Tout afficher",
  copy: "Copier",
  copied: "Copié",
  nullable: "nullable",
  unique: "unique",
  primary: "clé primaire",
  jdlSource: "JDL importé",
  visible: "visibles",
  shortcuts: "Molette pour zoomer · glisser pour se déplacer · glisser une entité pour la déplacer",
  parseError: "Ligne"
};
function ds(e) {
  return (e || (typeof navigator != "undefined" && /^fr/i.test(navigator.language) ? "fr" : "en")) === "fr" ? ls : ss;
}
class fe extends Error {
  constructor(t, n) {
    super(t), this.line = n;
  }
}
const Nn = ["OneToOne", "ManyToOne", "OneToMany", "ManyToMany"], cs = /* @__PURE__ */ new Set(["required", "unique", "min", "max", "minlength", "maxlength", "pattern", "minbytes", "maxbytes"]);
function us(e) {
  const t = [];
  let n = 0, r = 1;
  const i = e.length;
  for (; n < i; ) {
    const a = e[n];
    if (a === `
`) {
      r++, n++;
      continue;
    }
    if (/\s/.test(a)) {
      n++;
      continue;
    }
    if (a === "/" && e[n + 1] === "/") {
      for (; n < i && e[n] !== `
`; ) n++;
      continue;
    }
    if (a === "/" && e[n + 1] === "*") {
      const o = n, s = r, l = e.indexOf("*/", n + 2), d = l === -1 ? i : l + 2, c = e.slice(o, d);
      for (const h of c) h === `
` && r++;
      c.startsWith("/**") && t.push({ type: "doc", value: c, line: s }), n = d;
      continue;
    }
    if (a === '"' || a === "'") {
      let o = n + 1;
      for (; o < i && e[o] !== a; )
        e[o] === "\\" && o++, o++;
      t.push({ type: "string", value: e.slice(n + 1, o), line: r }), n = o + 1;
      continue;
    }
    if (a === "@") {
      let o = n + 1;
      for (; o < i && /[\w]/.test(e[o]); ) o++;
      t.push({ type: "annotation", value: e.slice(n + 1, o), line: r }), n = o;
      continue;
    }
    if ("{}(),;=*".includes(a)) {
      t.push({ type: "punct", value: a, line: r }), n++;
      continue;
    }
    if (/[0-9-]/.test(a)) {
      let o = n + 1;
      for (; o < i && /[0-9.]/.test(e[o]); ) o++;
      t.push({ type: "number", value: e.slice(n, o), line: r }), n = o;
      continue;
    }
    if (/[\w\\$.]/.test(a)) {
      let o = n + 1;
      for (; o < i && /[\w\\$.]/.test(e[o]); ) o++;
      t.push({ type: "ident", value: e.slice(n, o), line: r }), n = o;
      continue;
    }
    throw new fe(`Unexpected character "${a}"`, r);
  }
  return t;
}
function he(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}
function hs(e) {
  return e.charAt(0).toLowerCase() + e.slice(1);
}
function le(e) {
  const t = e.lastIndexOf("\\");
  return t === -1 ? { name: e, namespace: "" } : { name: e.slice(t + 1), namespace: e.slice(0, t) };
}
function fs(e) {
  const t = e.replace(/^\/\*\*|\*\/$/g, "").split(`
`).map((r) => r.replace(/^\s*\*\s?/, "").trim()).filter(Boolean), n = {};
  for (const r of t) {
    const i = /^@table\s+(\S+)/.exec(r);
    i ? n.table = i[1] : !n.fqcn && /^[\w\\]+\\[\w]+$/.test(r) && (n.fqcn = r);
  }
  return n;
}
function ms(e, t = "jdl") {
  const n = us(e);
  let r = 0, i = null;
  const a = /* @__PURE__ */ new Map(), o = [], s = (w = 0) => n[r + w], l = () => n.length ? n[n.length - 1].line : 1, d = () => {
    const w = n[r++];
    if (!w) throw new fe("Unexpected end of file", l());
    return w;
  }, c = (w) => {
    const g = d();
    if (g.value !== w) throw new fe(`Expected "${w}" but found "${g.value}"`, g.line);
    return g;
  }, h = (w) => {
    const g = d();
    if (g.type !== "ident") throw new fe(`Expected ${w} but found "${g.value}"`, g.line);
    return g;
  }, f = () => {
    var g;
    if (((g = s()) == null ? void 0 : g.value) !== "(") return;
    let w = 0;
    do {
      const C = d();
      C.value === "(" && w++, C.value === ")" && w--;
    } while (w > 0);
  }, m = () => {
    let w = 0;
    do {
      const g = d();
      g.value === "{" && w++, g.value === "}" && w--;
    } while (w > 0);
  }, k = () => {
    var w, g;
    for (; ((w = s()) == null ? void 0 : w.type) === "doc" || ((g = s()) == null ? void 0 : g.type) === "annotation"; )
      d().type === "annotation" && f();
  }, N = (w) => {
    let g = a.get(w);
    if (!g) {
      const { name: C, namespace: I } = le(w);
      g = { id: w, name: C, namespace: I, table: he(C), kind: "entity", parent: null, fields: [] }, a.set(w, g);
    }
    return g;
  }, _ = () => {
    var J, B, ae, U, de, oe;
    const w = h("an entity name"), g = i || {};
    i = null;
    let C = g.table || null;
    ((J = s()) == null ? void 0 : J.value) === "(" && (d(), C = h("a table name").value, c(")"));
    const I = w.value, E = g.fqcn || I, { namespace: F } = le(E), x = [];
    if (((B = s()) == null ? void 0 : B.value) === "{") {
      for (d(); s() && s().value !== "}" && (k(), ((ae = s()) == null ? void 0 : ae.value) !== "}"); ) {
        const K = h("a field name"), W = h("a field type");
        let ve = !1, pe = !1, ce = null;
        for (; ((U = s()) == null ? void 0 : U.type) === "ident" && cs.has(s().value.toLowerCase()); ) {
          const se = d().value.toLowerCase();
          if (se === "required" && (ve = !0), se === "unique" && (pe = !0), se === "maxlength" && ((de = s()) == null ? void 0 : de.value) === "(") {
            d();
            const Ne = d();
            ce = parseInt(Ne.value, 10) || null, c(")");
          } else
            f();
        }
        ((oe = s()) == null ? void 0 : oe.value) === "," && d(), x.push({ name: K.value, column: he(K.value), type: W.value, nullable: !ve, unique: pe, id: !1, length: ce });
      }
      c("}");
    }
    x.some((K) => K.name === "id") ? x.forEach((K) => {
      K.name === "id" && (K.id = !0);
    }) : x.unshift({ name: "id", column: "id", type: "Long", nullable: !1, unique: !0, id: !0, length: null });
    const $ = a.get(I), R = {
      id: E,
      name: le(E).name,
      namespace: F,
      table: C || he(le(I).name),
      kind: "entity",
      parent: null,
      fields: x
    };
    $ ? Object.assign($, R) : a.set(I, R);
  }, b = () => {
    const w = h("an enum name").value;
    i = null;
    const g = [];
    for (c("{"); s() && s().value !== "}"; ) {
      k();
      const E = d();
      E.type === "ident" && (g.push({ name: E.value, column: E.value, type: "", nullable: !1, unique: !1, id: !1, length: null }), f());
    }
    c("}");
    const { name: C, namespace: I } = le(w);
    a.set(w, { id: w, name: C, namespace: I, table: null, kind: "enum", parent: null, fields: g });
  }, M = () => {
    var I, E;
    k();
    const w = h("an entity name").value;
    let g, C = !1;
    if (((I = s()) == null ? void 0 : I.value) === "{") {
      for (d(), ((E = s()) == null ? void 0 : E.type) === "ident" && (g = d().value, f()); s() && s().value !== "}"; )
        d().value.toLowerCase() === "required" && (C = !0);
      c("}");
    }
    return { entity: w, field: g, required: C };
  }, T = () => {
    var C, I;
    const w = h("a relationship type"), g = Nn.find((E) => E.toLowerCase() === w.value.toLowerCase());
    if (!g) throw new fe(`Unknown relationship type "${w.value}"`, w.line);
    for (i = null, c("{"); s() && s().value !== "}"; ) {
      const E = M(), F = d();
      if (F.value.toLowerCase() !== "to") throw new fe(`Expected "to" but found "${F.value}"`, F.line);
      const x = M();
      if (((C = s()) == null ? void 0 : C.value.toLowerCase()) === "with" && (d(), d()), k(), ((I = s()) == null ? void 0 : I.value) === "," && d(), N(E.entity), N(x.entity), g === "OneToMany" && x.field) {
        o.push({
          id: `${x.entity}::${x.field}`,
          type: "ManyToOne",
          source: x.entity,
          target: E.entity,
          field: x.field,
          inverseField: E.field || null,
          joinColumns: [`${he(x.field)}_id`],
          joinTable: null,
          nullable: !x.required
        });
        continue;
      }
      const $ = E.field || hs(le(x.entity).name);
      o.push({
        id: `${E.entity}::${$}`,
        type: g,
        source: E.entity,
        target: x.entity,
        field: $,
        inverseField: x.field || null,
        joinColumns: g === "ManyToMany" || g === "OneToMany" ? [] : [`${he($)}_id`],
        joinTable: g === "ManyToMany" ? `${he(le(E.entity).name)}_${he(le(x.entity).name)}` : null,
        nullable: !E.required
      });
    }
    c("}");
  };
  for (; r < n.length; ) {
    const w = s();
    if (w.type === "doc") {
      i = fs(w.value), r++;
      continue;
    }
    if (w.type === "annotation") {
      r++, f();
      continue;
    }
    const g = w.type === "ident" ? w.value.toLowerCase() : "";
    if (g === "entity")
      r++, _();
    else if (g === "enum")
      r++, b();
    else if (g === "relationship")
      r++, T();
    else
      for (i = null, r++; s() && !["entity", "enum", "relationship"].includes(s().value.toLowerCase()) && s().type !== "doc"; )
        s().value === "{" ? m() : r++;
  }
  const j = (w) => {
    var g;
    return ((g = a.get(w)) == null ? void 0 : g.id) || w;
  }, D = o.map((w) => ({ ...w, source: j(w.source), target: j(w.target), id: `${j(w.source)}::${w.field}` }));
  return {
    manager: t,
    managers: [{ name: t, connection: null, database: null, driver: "JDL", default: !0 }],
    entities: Array.from(a.values()).sort((w, g) => w.id.localeCompare(g.id)),
    relations: D
  };
}
const Ft = {
  string: "String",
  ascii_string: "String",
  text: "TextBlob",
  integer: "Integer",
  smallint: "Integer",
  bigint: "Long",
  float: "Double",
  decimal: "BigDecimal",
  boolean: "Boolean",
  date: "LocalDate",
  date_immutable: "LocalDate",
  datetime: "Instant",
  datetime_immutable: "Instant",
  datetimetz: "ZonedDateTime",
  datetimetz_immutable: "ZonedDateTime",
  time: "Duration",
  time_immutable: "Duration",
  guid: "UUID",
  uuid: "UUID",
  ulid: "String",
  blob: "Blob",
  binary: "Blob",
  json: "TextBlob",
  json_array: "TextBlob",
  array: "TextBlob",
  simple_array: "TextBlob",
  object: "TextBlob"
};
function ps(e) {
  return Ft[e] ? Ft[e] : /^[A-Z]/.test(e) ? e : "String";
}
function Vt(e) {
  const t = /* @__PURE__ */ new Map();
  e.entities.forEach((a) => t.set(a.name, (t.get(a.name) || 0) + 1));
  const n = /* @__PURE__ */ new Map();
  e.entities.forEach((a) => n.set(a.id, t.get(a.name) === 1 ? a.name : a.id.replace(/\\/g, "_")));
  const r = (a) => a.replace(/\./g, "_"), i = [`/* Doctrine entity manager "${e.manager}" */`, ""];
  for (const a of e.entities) {
    if (a.kind === "enum") {
      i.push(`enum ${n.get(a.id)} {`, `  ${a.fields.map((o) => o.name).join(", ")}`, "}", "");
      continue;
    }
    i.push("/**", ` * ${a.id}`), a.table && i.push(` * @table ${a.table}`), i.push(" */", `entity ${n.get(a.id)} {`);
    for (const o of a.fields)
      o.id && o.name === "id" || i.push(`  ${r(o.name)} ${ps(o.type)}${o.nullable ? "" : " required"}`);
    i.push("}", "");
  }
  for (const a of Nn) {
    const o = e.relations.filter((s) => s.type === a);
    o.length && (i.push(`relationship ${a} {`), o.forEach((s, l) => {
      const d = s.inverseField ? `{${r(s.inverseField)}}` : "";
      i.push(`  ${n.get(s.source) || s.source}{${r(s.field)}} to ${n.get(s.target) || s.target}${d}${l < o.length - 1 ? "," : ""}`);
    }), i.push("}", ""));
  }
  return i.join(`
`);
}
const bs = {
  title: "650 13.5px",
  row: "400 12px",
  type: "400 11px"
};
function gs(e, t) {
  let n = null;
  try {
    n = document.createElement("canvas").getContext("2d");
  } catch {
    n = null;
  }
  const r = /* @__PURE__ */ new Map();
  return (i, a) => {
    const o = `${a}|${i}`, s = r.get(o);
    if (s !== void 0) return s;
    let l;
    return n ? (n.font = `${bs[a]} ${a === "type" ? t : e}`, l = n.measureText(i).width) : l = i.length * (a === "title" ? 8 : 7), r.set(o, l), l;
  };
}
const rt = `.bmd{--_accent: var(--bmd-accent, #4f5bd5);--_accent-fg: var(--bmd-accent-foreground, #ffffff);--_bg: var(--bmd-bg, #f6f7f9);--_surface: var(--bmd-surface, #ffffff);--_surface-2: var(--bmd-surface-2, #f1f3f6);--_border: var(--bmd-border, #e3e6eb);--_text: var(--bmd-text, #161a22);--_muted: var(--bmd-muted, #687083);--_canvas: var(--bmd-canvas, #f3f4f7);--_grid: var(--bmd-grid, #d7dbe2);--_danger: var(--bmd-danger, #d93f3f);--_radius: var(--bmd-radius, 10px);--_font: var(--bmd-font, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);--_mono: var(--bmd-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace);--_shadow: 0 1px 2px rgba(16, 24, 40, .06), 0 8px 24px rgba(16, 24, 40, .08);--_accent-soft: color-mix(in srgb, var(--_accent) 12%, transparent);--_accent-line: color-mix(in srgb, var(--_accent) 55%, transparent);--_edge: var(--bmd-edge, #9aa3b5);position:relative;display:flex;flex-direction:column;box-sizing:border-box;width:100%;height:100%;min-height:420px;overflow:hidden;background:var(--_bg);color:var(--_text);font-family:var(--_font);font-size:13px;line-height:1.45;color-scheme:light;border-radius:inherit;-webkit-font-smoothing:antialiased;container-type:inline-size;container-name:bmd}.bmd[data-theme=dark]{--_accent: var(--bmd-accent, #8b93ff);--_accent-fg: var(--bmd-accent-foreground, #0d0f14);--_bg: var(--bmd-bg, #0e1116);--_surface: var(--bmd-surface, #161a21);--_surface-2: var(--bmd-surface-2, #1d222b);--_border: var(--bmd-border, #2a303b);--_text: var(--bmd-text, #e7eaf0);--_muted: var(--bmd-muted, #959db0);--_canvas: var(--bmd-canvas, #11141a);--_grid: var(--bmd-grid, #262c36);--_danger: var(--bmd-danger, #f07272);--_shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 10px 30px rgba(0, 0, 0, .35);--_edge: var(--bmd-edge, #5d6678);color-scheme:dark}.bmd *,.bmd *:before,.bmd *:after{box-sizing:border-box}.bmd button,.bmd input,.bmd select,.bmd textarea{font:inherit;color:inherit;letter-spacing:normal}.bmd :focus-visible{outline:2px solid var(--_accent);outline-offset:1px}.bmd-toolbar{display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--_border);background:var(--_surface);flex-wrap:wrap;position:relative;z-index:5}.bmd-brand{display:flex;align-items:center;gap:10px;min-width:0;margin-right:auto}.bmd-logo{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:var(--_accent);color:var(--_accent-fg);flex:none}.bmd-title{font-weight:650;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmd-subtitle{color:var(--_muted);font-size:12px;white-space:nowrap}.bmd-group{display:inline-flex;align-items:center;gap:2px;padding:2px;border:1px solid var(--_border);border-radius:9px;background:var(--_surface-2)}.bmd-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;min-width:30px;padding:0 9px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--_text);cursor:pointer;font-size:12.5px;font-weight:500;white-space:nowrap;transition:background .12s,border-color .12s,color .12s}.bmd-btn:hover{background:var(--_surface-2)}.bmd-group .bmd-btn{height:26px;min-width:26px;padding:0 8px}.bmd-group .bmd-btn:hover{background:var(--_surface)}.bmd-btn[aria-pressed=true]{background:var(--_surface);border-color:var(--_border);box-shadow:0 1px 2px #10182814;color:var(--_text)}.bmd-btn--outline{border-color:var(--_border);background:var(--_surface)}.bmd-btn--primary{background:var(--_accent);color:var(--_accent-fg)}.bmd-btn--primary:hover{background:color-mix(in srgb,var(--_accent) 88%,#000)}.bmd-btn--icon{padding:0;width:30px}.bmd-btn:disabled{opacity:.45;cursor:default}.bmd-btn svg,.bmd-icon{width:16px;height:16px;flex:none;display:block}.bmd-zoom{min-width:46px;text-align:center;font-variant-numeric:tabular-nums;font-size:12px;color:var(--_muted)}.bmd-select{height:30px;padding:0 28px 0 10px;border:1px solid var(--_border);border-radius:7px;background:var(--_surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 9px center;appearance:none;-webkit-appearance:none;cursor:pointer;font-size:12.5px}.bmd-sep{width:1px;height:22px;background:var(--_border)}.bmd-menu{position:relative}.bmd-menu-list{position:absolute;right:0;top:calc(100% + 6px);min-width:190px;padding:5px;border:1px solid var(--_border);border-radius:var(--_radius);background:var(--_surface);box-shadow:var(--_shadow);z-index:30}.bmd-menu-item{display:flex;align-items:center;gap:9px;width:100%;padding:7px 9px;border:0;border-radius:6px;background:transparent;cursor:pointer;text-align:left;font-size:12.5px}.bmd-menu-item:hover{background:var(--_surface-2)}.bmd-body{position:relative;display:flex;flex:1;min-height:0}.bmd-sidebar{display:flex;flex-direction:column;width:272px;flex:none;border-right:1px solid var(--_border);background:var(--_surface);min-height:0}.bmd-sidebar[hidden]{display:none}.bmd-sidebar-head{padding:10px;display:grid;gap:8px;border-bottom:1px solid var(--_border)}.bmd-search{position:relative}.bmd-search svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--_muted);pointer-events:none}.bmd-input{width:100%;height:32px;padding:0 10px 0 31px;border:1px solid var(--_border);border-radius:8px;background:var(--_surface-2);font-size:12.5px;outline:none}.bmd-input:focus{border-color:var(--_accent-line);background:var(--_surface)}.bmd-sidebar-meta{display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--_muted)}.bmd-link{border:0;background:none;padding:0;color:var(--_accent);cursor:pointer;font-size:11.5px;font-weight:500}.bmd-tree{flex:1;overflow:auto;padding:6px 6px 12px}.bmd-ns{margin-top:4px}.bmd-ns-head{display:flex;align-items:center;gap:7px;width:100%;padding:6px;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--_muted);text-align:left;border-radius:6px}.bmd-ns-head:hover{background:var(--_surface-2)}.bmd-ns-head svg{width:13px;height:13px;transition:transform .15s}.bmd-ns-head[aria-expanded=false] svg{transform:rotate(-90deg)}.bmd-ns-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bmd-dot{width:8px;height:8px;border-radius:99px;flex:none}.bmd-count{font-variant-numeric:tabular-nums;font-weight:500;color:var(--_muted)}.bmd-item{display:flex;align-items:center;gap:8px;width:100%;padding:4px 6px 4px 8px;border-radius:6px;cursor:pointer;font-size:12.5px}.bmd-item:hover{background:var(--_surface-2)}.bmd-item.is-selected{background:var(--_accent-soft)}.bmd-item.is-hidden .bmd-item-name{color:var(--_muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--_muted) 50%,transparent)}.bmd-item-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:0;background:none;padding:2px 0;cursor:pointer;text-align:left}.bmd-eye{display:grid;place-items:center;width:24px;height:24px;border:0;border-radius:5px;background:none;color:var(--_muted);cursor:pointer;opacity:.55}.bmd-item:hover .bmd-eye,.bmd-item.is-hidden .bmd-eye{opacity:1}.bmd-eye:hover{background:var(--_surface);color:var(--_text)}.bmd-eye svg{width:15px;height:15px}.bmd-empty-list{padding:18px 10px;color:var(--_muted);text-align:center;font-size:12.5px}.bmd-stage{position:relative;flex:1;min-width:0;background:var(--_canvas);overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}.bmd-stage.is-panning{cursor:grabbing}.bmd-svg{display:block;width:100%;height:100%}.bmd-hint{position:absolute;left:12px;bottom:10px;padding:4px 9px;border-radius:99px;background:color-mix(in srgb,var(--_surface) 85%,transparent);border:1px solid var(--_border);color:var(--_muted);font-size:11px;pointer-events:none;backdrop-filter:blur(6px)}.bmd-minimap{position:absolute;right:12px;bottom:12px;width:190px;height:128px;border:1px solid var(--_border);border-radius:9px;background:color-mix(in srgb,var(--_surface) 92%,transparent);box-shadow:var(--_shadow);overflow:hidden;cursor:pointer;backdrop-filter:blur(6px)}.bmd-minimap svg{display:block;width:100%;height:100%}.bmd-panel{display:flex;flex-direction:column;width:360px;max-width:100%;flex:none;border-left:1px solid var(--_border);background:var(--_surface);min-height:0}.bmd-panel--wide{width:440px}.bmd-panel-head{display:flex;align-items:flex-start;gap:10px;padding:12px 12px 10px 14px;border-bottom:1px solid var(--_border)}.bmd-panel-title{flex:1;min-width:0}.bmd-panel-title h3{margin:0;font-size:15px;font-weight:650;line-height:1.3;word-break:break-word}.bmd-panel-title p{margin:2px 0 0;color:var(--_muted);font-family:var(--_mono);font-size:11px;word-break:break-all}.bmd-panel-body{flex:1;overflow:auto;padding:12px 14px 16px}.bmd-kv{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0 0 16px;font-size:12.5px}.bmd-kv dt{color:var(--_muted)}.bmd-kv dd{margin:0;font-family:var(--_mono);font-size:12px;word-break:break-all}.bmd-section{margin:18px 0 8px;font-size:11px;font-weight:650;letter-spacing:.06em;text-transform:uppercase;color:var(--_muted)}.bmd-fields{width:100%;border-collapse:collapse;font-size:12.5px}.bmd-fields td{padding:6px 4px;border-bottom:1px solid var(--_border);vertical-align:top}.bmd-fields tr:last-child td{border-bottom:0}.bmd-fields .bmd-col-type{font-family:var(--_mono);font-size:11.5px;color:var(--_muted);text-align:right;white-space:nowrap}.bmd-fields small{display:block;color:var(--_muted);font-family:var(--_mono);font-size:11px}.bmd-badges{display:inline-flex;gap:4px;margin-left:6px;vertical-align:1px}.bmd-badge{display:inline-block;padding:0 5px;border-radius:4px;font-size:10px;font-weight:600;line-height:16px;background:var(--_surface-2);color:var(--_muted);border:1px solid var(--_border)}.bmd-badge--accent{background:var(--_accent-soft);color:var(--_accent);border-color:transparent}.bmd-rel{display:flex;align-items:center;gap:8px;width:100%;padding:7px 8px;margin-bottom:4px;border:1px solid var(--_border);border-radius:8px;background:var(--_surface);cursor:pointer;text-align:left;font-size:12.5px}.bmd-rel:hover{border-color:var(--_accent-line);background:var(--_accent-soft)}.bmd-rel-type{font-family:var(--_mono);font-size:10.5px;color:var(--_muted);flex:none;min-width:34px}.bmd-rel-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bmd-rel-name b{font-weight:600}.bmd-actions{display:flex;gap:6px;flex-wrap:wrap;margin:2px 0 6px}.bmd-jdl{display:flex;flex-direction:column;flex:1;min-height:0}.bmd-jdl-hint{margin:0;padding:10px 14px;color:var(--_muted);font-size:12px;border-bottom:1px solid var(--_border)}.bmd-editor{position:relative;display:flex;flex:1;min-height:0;background:var(--_surface-2);font-family:var(--_mono);font-size:12px;line-height:19px}.bmd-gutter{flex:none;padding:10px 8px 10px 10px;color:var(--_muted);text-align:right;opacity:.6;overflow:hidden;user-select:none;white-space:pre}.bmd-gutter .is-error{color:var(--_danger);opacity:1;font-weight:700}.bmd-textarea{flex:1;min-width:0;padding:10px 12px 10px 4px;border:0;outline:none;resize:none;background:transparent;color:var(--_text);font:inherit;white-space:pre;overflow:auto;tab-size:2}.bmd-jdl-foot{display:flex;align-items:center;gap:6px;padding:10px 12px;border-top:1px solid var(--_border);flex-wrap:wrap}.bmd-error-msg{flex-basis:100%;color:var(--_danger);font-size:12px}.bmd-state{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;color:var(--_muted)}.bmd-state-box{display:grid;gap:10px;justify-items:center;max-width:380px}.bmd-state strong{color:var(--_text);font-size:14px}.bmd-spinner{width:26px;height:26px;border-radius:99px;border:2.5px solid var(--_border);border-top-color:var(--_accent);animation:bmd-spin .8s linear infinite}@keyframes bmd-spin{to{transform:rotate(360deg)}}.bmd-toast{position:absolute;left:50%;bottom:18px;transform:translate(-50%);padding:8px 14px;border-radius:99px;background:var(--_text);color:var(--_bg);font-size:12.5px;box-shadow:var(--_shadow);z-index:40;pointer-events:none}@container bmd (max-width: 900px){.bmd-sidebar{position:absolute;inset:0 auto 0 0;z-index:12;box-shadow:var(--_shadow)}.bmd-panel,.bmd-panel--wide{position:absolute;inset:0 0 0 auto;width:min(400px,100%);z-index:12;box-shadow:var(--_shadow)}.bmd-hide-sm{display:none!important}.bmd-minimap{display:none}}`, ol = rt, Gt = /* @__PURE__ */ new WeakSet();
function vs(e) {
  if (typeof document == "undefined") return;
  const t = e && typeof ShadowRoot != "undefined" && e.getRootNode() instanceof ShadowRoot ? e.getRootNode() : document;
  if (!Gt.has(t)) {
    Gt.add(t);
    try {
      const n = new CSSStyleSheet();
      n.replaceSync(rt), t.adoptedStyleSheets = [...t.adoptedStyleSheets, n];
    } catch {
      const n = document.createElement("style");
      n.setAttribute("data-doctrine-diagram", ""), n.textContent = rt, (t instanceof Document ? t.head : t).appendChild(n);
    }
  }
}
const ys = 0.08, xs = 2.5;
function it(e) {
  return Math.min(xs, Math.max(ys, e));
}
function ws(e) {
  switch (e.type) {
    case "ManyToOne":
      return { start: "many", startOptional: !0, end: "one", endOptional: e.nullable };
    case "OneToOne":
      return { start: "one", startOptional: !0, end: "one", endOptional: e.nullable };
    case "OneToMany":
      return { start: "one", startOptional: !0, end: "many", endOptional: !0 };
    default:
      return { start: "many", startOptional: !0, end: "many", endOptional: !0 };
  }
}
const ks = ({ kind: e }) => e === "pk" ? /* @__PURE__ */ y("g", { className: "bmd-row-icon is-pk", transform: "translate(12 6)", children: [
  /* @__PURE__ */ u("circle", { cx: "3.5", cy: "6", r: "2.8" }),
  /* @__PURE__ */ u("path", { d: "M6.3 6H12M10.2 6v2.4M12 6v2" })
] }) : e === "fk" ? /* @__PURE__ */ u("g", { className: "bmd-row-icon is-ref", transform: "translate(12 6)", children: /* @__PURE__ */ u("path", { d: "M1 6h9M7 3l3 3-3 3" }) }) : e === "collection" ? /* @__PURE__ */ u("g", { className: "bmd-row-icon is-ref", transform: "translate(12 6)", children: /* @__PURE__ */ u("path", { d: "M1 3h3M1 6h3M1 9h3M6 3h5M6 6h5M6 9h5" }) }) : /* @__PURE__ */ u("g", { className: "bmd-row-icon", transform: "translate(12 6)", children: /* @__PURE__ */ u("circle", { cx: "5", cy: "6", r: "1.6" }) }), _s = Yt(function({ box: t, color: n, selected: r, dim: i, kindLabel: a }) {
  const { entity: o, rows: s, width: l, height: d } = t, c = 10, h = `M0,${c} a${c},${c} 0 0 1 ${c},-${c} h${l - 2 * c} a${c},${c} 0 0 1 ${c},${c} v${ne - c} h-${l} z`;
  return /* @__PURE__ */ y("g", { className: `bmd-node${r ? " is-selected" : ""}${i ? " is-dim" : ""}`, transform: `translate(${t.x} ${t.y})`, "data-node": t.id, children: [
    /* @__PURE__ */ u("rect", { className: "bmd-node-shadow", x: 1, y: 3, width: l, height: d, rx: c }),
    /* @__PURE__ */ u("rect", { className: "bmd-node-bg", width: l, height: d, rx: c }),
    /* @__PURE__ */ u("path", { className: "bmd-node-head", d: h }),
    /* @__PURE__ */ u("rect", { className: "bmd-node-strip", x: 0, y: 0, width: l, height: 3, rx: 1.5, fill: n }),
    /* @__PURE__ */ u("text", { className: "bmd-node-title", x: 14, y: 22, children: o.name }),
    /* @__PURE__ */ u("text", { className: "bmd-node-sub", x: 14, y: 37, children: o.table || o.namespace || " " }),
    a ? /* @__PURE__ */ u("text", { className: "bmd-node-kind", x: l - 12, y: 22, textAnchor: "end", children: a }) : null,
    s.length ? /* @__PURE__ */ u("line", { className: "bmd-node-sep", x1: 0, x2: l, y1: ne, y2: ne }) : null,
    s.map((f, m) => /* @__PURE__ */ y("g", { transform: `translate(0 ${ne + m * Ae})`, children: [
      /* @__PURE__ */ u(ks, { kind: f.kind }),
      /* @__PURE__ */ y("text", { className: `bmd-row-name${f.kind === "pk" ? " is-pk" : ""}${f.nullable && f.kind === "field" ? " is-nullable" : ""}`, x: 32, y: 16, children: [
        f.label,
        f.nullable && f.kind === "field" ? "?" : ""
      ] }),
      /* @__PURE__ */ u("text", { className: `bmd-row-type${f.kind === "fk" || f.kind === "collection" ? " is-ref" : ""}`, x: l - 12, y: 16, textAnchor: "end", children: f.type })
    ] }, f.key)),
    s.length ? /* @__PURE__ */ u("rect", { width: l, height: nt, y: d - nt, fill: "transparent" }) : null
  ] });
}), Es = Yt(function({ edge: t, active: n, dim: r }) {
  const i = `bmd-link${n ? " is-active" : ""}${r ? " is-dim" : ""}`;
  if (t.inheritance) {
    const c = t.end, h = t.endDir, f = -h.y, m = h.x, k = c, N = { x: c.x + h.x * 12 + f * 7, y: c.y + h.y * 12 + m * 7 }, _ = { x: c.x + h.x * 12 - f * 7, y: c.y + h.y * 12 - m * 7 };
    return /* @__PURE__ */ y("g", { className: i, children: [
      /* @__PURE__ */ u("path", { className: "bmd-edge is-inheritance", d: t.d }),
      /* @__PURE__ */ u("path", { className: "bmd-edge-arrow", d: `M${k.x},${k.y} L${N.x},${N.y} L${_.x},${_.y} Z` })
    ] });
  }
  const a = ws(t.relation), o = a.startOptional ? zt(t.start, t.startDir, a.start) : null, s = a.endOptional ? zt(t.end, t.endDir, a.end) : null, l = t.relation.field + (t.relation.inverseField ? ` ⇄ ${t.relation.inverseField}` : ""), d = l.length * 6.4 + 16;
  return /* @__PURE__ */ y("g", { className: i, "data-edge": t.id, children: [
    /* @__PURE__ */ u("path", { className: "bmd-hit", d: t.d }),
    /* @__PURE__ */ u("path", { className: "bmd-edge", d: t.d }),
    /* @__PURE__ */ u("path", { className: "bmd-edge-glyph", d: Pt(t.start, t.startDir, a.start, a.startOptional) }),
    /* @__PURE__ */ u("path", { className: "bmd-edge-glyph", d: Pt(t.end, t.endDir, a.end, a.endOptional) }),
    o ? /* @__PURE__ */ u("circle", { className: "bmd-edge-circle", cx: o.x, cy: o.y, r: 3.6 }) : null,
    s ? /* @__PURE__ */ u("circle", { className: "bmd-edge-circle", cx: s.x, cy: s.y, r: 3.6 }) : null,
    n ? /* @__PURE__ */ y("g", { transform: `translate(${t.mid.x} ${t.mid.y})`, children: [
      /* @__PURE__ */ u("rect", { className: "bmd-edge-label-bg", x: -d / 2, y: -11, width: d, height: 22, rx: 11 }),
      /* @__PURE__ */ u("text", { className: "bmd-edge-label", textAnchor: "middle", y: 4, children: l })
    ] }) : null
  ] });
});
function Ns(e) {
  const { boxes: t, edges: n, viewport: r, onViewport: i, selectedId: a, hoveredId: o, onHover: s, onSelect: l, onMove: d, onMoveEnd: c, colors: h, kindLabels: f, svgRef: m, stageRef: k, hint: N } = e, _ = Q(null), [b, M] = S(!1), T = Q(r);
  T.current = r;
  const j = o || a, D = V(() => {
    if (!j) return null;
    const x = /* @__PURE__ */ new Set([j]);
    for (const $ of n)
      $.source === j && x.add($.target), $.target === j && x.add($.source);
    return x;
  }, [j, n]), w = V(() => new Map(t.map((x) => [x.id, x])), [t]);
  Z(() => {
    const x = k.current;
    if (!x) return;
    const $ = (R) => {
      R.preventDefault();
      const J = x.getBoundingClientRect(), B = T.current, ae = R.clientX - J.left, U = R.clientY - J.top, de = Math.exp(-R.deltaY * (R.ctrlKey ? 0.01 : 16e-4)), oe = it(B.k * de), K = (ae - B.x) / B.k, W = (U - B.y) / B.k;
      i({ k: oe, x: ae - K * oe, y: U - W * oe });
    };
    return x.addEventListener("wheel", $, { passive: !1 }), () => x.removeEventListener("wheel", $);
  }, [k, i]);
  const g = (x) => {
    let $ = x;
    for (; $ && $ !== k.current; ) {
      const R = $.getAttribute && $.getAttribute("data-node");
      if (R) return R;
      $ = $.parentNode;
    }
    return null;
  }, C = (x) => {
    if (x.button !== 0) return;
    const $ = g(x.target);
    if (x.currentTarget.setPointerCapture(x.pointerId), $) {
      const R = w.get($);
      if (!R) return;
      _.current = { type: "drag", pointer: x.pointerId, id: $, sx: x.clientX, sy: x.clientY, bx: R.x, by: R.y, moved: !1 };
    } else
      _.current = { type: "pan", pointer: x.pointerId, sx: x.clientX, sy: x.clientY, vx: r.x, vy: r.y, moved: !1 };
  }, I = (x) => {
    const $ = _.current;
    if (!$) {
      const B = g(x.target);
      B !== o && s(B);
      return;
    }
    const R = x.clientX - $.sx, J = x.clientY - $.sy;
    !$.moved && Math.hypot(R, J) < 4 || ($.moved = !0, $.type === "pan" ? (M(!0), i({ ...r, x: $.vx + R, y: $.vy + J })) : d($.id, $.bx + R / r.k, $.by + J / r.k));
  }, E = () => {
    const x = _.current;
    _.current = null, M(!1), x && (x.type === "drag" ? x.moved ? c() : l(x.id) : x.moved || l(null));
  }, F = 22 * r.k;
  return /* @__PURE__ */ y(
    "div",
    {
      ref: k,
      className: `bmd-stage${b ? " is-panning" : ""}`,
      onPointerDown: C,
      onPointerMove: I,
      onPointerUp: E,
      onPointerCancel: E,
      onPointerLeave: () => !_.current && s(null),
      children: [
        /* @__PURE__ */ y("svg", { ref: m, className: "bmd-svg", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ u("style", { children: _n(ns) }),
          /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u("pattern", { id: "bmd-grid", width: F, height: F, patternUnits: "userSpaceOnUse", x: r.x % F, y: r.y % F, children: /* @__PURE__ */ u("circle", { cx: 1, cy: 1, r: Math.max(0.6, Math.min(1.2, r.k)), fill: "var(--_grid)" }) }) }),
          /* @__PURE__ */ u("rect", { className: "bmd-grid-bg", width: "100%", height: "100%", fill: r.k > 0.25 ? "url(#bmd-grid)" : "none" }),
          /* @__PURE__ */ y("g", { className: "bmd-viewport", transform: `translate(${r.x} ${r.y}) scale(${r.k})`, children: [
            /* @__PURE__ */ u("g", { className: "bmd-links", children: n.map((x) => {
              const $ = !!j && (x.source === j || x.target === j);
              return /* @__PURE__ */ u(Es, { edge: x, active: $, dim: !!D && !$ }, x.id);
            }) }),
            /* @__PURE__ */ u("g", { className: "bmd-nodes", children: t.map((x) => /* @__PURE__ */ u(
              _s,
              {
                box: x,
                color: h.get(x.entity.namespace) || "var(--_accent)",
                selected: x.id === a,
                dim: !!D && !D.has(x.id),
                kindLabel: f[x.entity.kind] || null
              },
              x.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ u("div", { className: "bmd-hint bmd-hide-sm", children: N }),
        e.children
      ]
    }
  );
}
function $s({ boxes: e, viewport: t, stageSize: n, colors: r, onCenter: i }) {
  let l = 1 / 0, d = 1 / 0, c = -1 / 0, h = -1 / 0;
  for (const b of e)
    l = Math.min(l, b.x), d = Math.min(d, b.y), c = Math.max(c, b.x + b.width), h = Math.max(h, b.y + b.height);
  if (!e.length) return null;
  const f = Math.min((190 - 8 * 2) / Math.max(1, c - l), (128 - 8 * 2) / Math.max(1, h - d)), m = 8 - l * f + (190 - 8 * 2 - (c - l) * f) / 2, k = 8 - d * f + (128 - 8 * 2 - (h - d) * f) / 2, N = {
    x: -t.x / t.k * f + m,
    y: -t.y / t.k * f + k,
    w: n.width / t.k * f,
    h: n.height / t.k * f
  }, _ = (b) => {
    const M = b.currentTarget.getBoundingClientRect(), T = (b.clientX - M.left) / M.width * 190, j = (b.clientY - M.top) / M.height * 128;
    i({ x: (T - m) / f, y: (j - k) / f });
  };
  return /* @__PURE__ */ u(
    "div",
    {
      className: "bmd-minimap",
      onPointerDown: (b) => {
        b.stopPropagation(), b.currentTarget.setPointerCapture(b.pointerId), _(b);
      },
      onPointerMove: (b) => {
        b.stopPropagation(), b.buttons === 1 && _(b);
      },
      onPointerUp: (b) => b.stopPropagation(),
      children: /* @__PURE__ */ y("svg", { viewBox: "0 0 190 128", preserveAspectRatio: "xMidYMid meet", children: [
        e.map((b) => /* @__PURE__ */ u(
          "rect",
          {
            x: b.x * f + m,
            y: b.y * f + k,
            width: Math.max(1.5, b.width * f),
            height: Math.max(1.5, b.height * f),
            rx: 1.5,
            fill: r.get(b.entity.namespace) || "var(--_accent)",
            opacity: 0.55
          },
          b.id
        )),
        /* @__PURE__ */ u("rect", { x: N.x, y: N.y, width: N.w, height: N.h, fill: "var(--_accent-soft)", stroke: "var(--_accent)", strokeWidth: 1.2, rx: 2 })
      ] })
    }
  );
}
const A = (e) => function(n) {
  return /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...n, children: e });
}, Ms = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "7", height: "6", rx: "1.5" }),
    /* @__PURE__ */ u("rect", { x: "14", y: "15", width: "7", height: "6", rx: "1.5" }),
    /* @__PURE__ */ u("rect", { x: "14", y: "3", width: "7", height: "6", rx: "1.5" }),
    /* @__PURE__ */ u("path", { d: "M10 6h4M17.5 9v6" })
  ] })
), Os = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ u("path", { d: "M9 4v16" })
  ] })
), Cs = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ u("path", { d: "m20 20-3.5-3.5" })
  ] })
), Is = A(/* @__PURE__ */ u("path", { d: "M12 5v14M5 12h14" })), js = A(/* @__PURE__ */ u("path", { d: "M5 12h14" })), Ls = A(/* @__PURE__ */ u("path", { d: "M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4" })), Ss = A(/* @__PURE__ */ u("path", { d: "m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" })), $n = A(/* @__PURE__ */ u("path", { d: "M12 4v11m0 0-4-4m4 4 4-4M5 20h14" })), Ts = A(/* @__PURE__ */ u("path", { d: "M12 20V9m0 0-4 4m4-4 4 4M5 4h14" })), Rs = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ u("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })
  ] })
), Ds = A(/* @__PURE__ */ u("path", { d: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" })), Mn = A(/* @__PURE__ */ u("path", { d: "M6 6l12 12M18 6 6 18" })), As = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("path", { d: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" }),
    /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "3" })
  ] })
), Ps = A(/* @__PURE__ */ u("path", { d: "M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2" })), zs = A(/* @__PURE__ */ u("path", { d: "m6 9 6 6 6-6" })), qt = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("rect", { x: "3", y: "4", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ u("rect", { x: "15", y: "4", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ u("rect", { x: "9", y: "15", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ u("path", { d: "M6 9v2.5h12V9M12 11.5V15" })
  ] })
), Fs = A(/* @__PURE__ */ u("path", { d: "M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16m0 4v-4h-4" })), Vs = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ u("path", { d: "M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" })
  ] })
), Gs = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
    /* @__PURE__ */ u("path", { d: "M5 15V6a2 2 0 0 1 2-2h8" })
  ] })
), Bt = A(
  /* @__PURE__ */ y(H, { children: [
    /* @__PURE__ */ u("ellipse", { cx: "12", cy: "5.5", rx: "7", ry: "2.5" }),
    /* @__PURE__ */ u("path", { d: "M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" })
  ] })
), Wt = A(/* @__PURE__ */ u("path", { d: "M5 12h14m-5-5 5 5-5 5" })), qs = { OneToOne: "1 : 1", ManyToOne: "N : 1", OneToMany: "1 : N", ManyToMany: "N : N" }, Bs = { OneToOne: "1 : 1", ManyToOne: "1 : N", OneToMany: "N : 1", ManyToMany: "N : N" };
function Ws({ entity: e, relations: t, names: n, focused: r, t: i, onClose: a, onSelect: o, onFocusToggle: s }) {
  const [l, d] = S(!1), c = t.filter((m) => m.source === e.id), h = t.filter((m) => m.target === e.id && m.source !== e.id), f = () => {
    navigator.clipboard && navigator.clipboard.writeText(e.id).then(
      () => {
        d(!0), setTimeout(() => d(!1), 1200);
      },
      () => {
      }
    );
  };
  return /* @__PURE__ */ y("aside", { className: "bmd-panel", "aria-label": e.name, children: [
    /* @__PURE__ */ y("div", { className: "bmd-panel-head", children: [
      /* @__PURE__ */ y("div", { className: "bmd-panel-title", children: [
        /* @__PURE__ */ u("h3", { children: e.name }),
        /* @__PURE__ */ u("p", { children: e.id })
      ] }),
      /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn bmd-btn--icon", onClick: a, "aria-label": i.close, title: i.close, children: /* @__PURE__ */ u(Mn, {}) })
    ] }),
    /* @__PURE__ */ y("div", { className: "bmd-panel-body", children: [
      /* @__PURE__ */ y("div", { className: "bmd-actions", children: [
        /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: s, "aria-pressed": r, children: [
          /* @__PURE__ */ u(Vs, {}),
          r ? i.unfocus : i.focus
        ] }),
        /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: f, children: [
          /* @__PURE__ */ u(Gs, {}),
          l ? i.copied : i.copy
        ] })
      ] }),
      /* @__PURE__ */ y("dl", { className: "bmd-kv", children: [
        e.table ? /* @__PURE__ */ y(H, { children: [
          /* @__PURE__ */ u("dt", { children: i.table }),
          /* @__PURE__ */ u("dd", { children: e.table })
        ] }) : null,
        /* @__PURE__ */ u("dt", { children: i.kind }),
        /* @__PURE__ */ u("dd", { children: e.kind }),
        e.parent ? /* @__PURE__ */ y(H, { children: [
          /* @__PURE__ */ u("dt", { children: i.parent }),
          /* @__PURE__ */ u("dd", { children: /* @__PURE__ */ u("button", { type: "button", className: "bmd-link", onClick: () => o(e.parent), children: n.get(e.parent) || e.parent }) })
        ] }) : null
      ] }),
      /* @__PURE__ */ y("div", { className: "bmd-section", children: [
        i.fields,
        " · ",
        e.fields.length
      ] }),
      /* @__PURE__ */ u("table", { className: "bmd-fields", children: /* @__PURE__ */ u("tbody", { children: e.fields.map((m) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ y("td", { children: [
          /* @__PURE__ */ u("span", { style: { fontWeight: m.id ? 650 : 400 }, children: m.name }),
          /* @__PURE__ */ y("span", { className: "bmd-badges", children: [
            m.id ? /* @__PURE__ */ u("span", { className: "bmd-badge bmd-badge--accent", title: i.primary, children: "PK" }) : null,
            m.unique && !m.id ? /* @__PURE__ */ u("span", { className: "bmd-badge", children: i.unique }) : null,
            m.nullable ? /* @__PURE__ */ u("span", { className: "bmd-badge", children: i.nullable }) : null
          ] }),
          m.column && m.column !== m.name ? /* @__PURE__ */ u("small", { children: m.column }) : null
        ] }),
        /* @__PURE__ */ y("td", { className: "bmd-col-type", children: [
          m.type,
          m.length ? `(${m.length})` : ""
        ] })
      ] }, m.name)) }) }),
      c.length ? /* @__PURE__ */ y(H, { children: [
        /* @__PURE__ */ y("div", { className: "bmd-section", children: [
          i.outgoing,
          " · ",
          c.length
        ] }),
        c.map((m) => /* @__PURE__ */ y("button", { type: "button", className: "bmd-rel", onClick: () => o(m.target), title: m.joinTable || m.joinColumns.join(", "), children: [
          /* @__PURE__ */ u("span", { className: "bmd-rel-type", children: qs[m.type] }),
          /* @__PURE__ */ y("span", { className: "bmd-rel-name", children: [
            m.field,
            " → ",
            /* @__PURE__ */ u("b", { children: n.get(m.target) || m.target })
          ] }),
          /* @__PURE__ */ u(Wt, { className: "bmd-icon" })
        ] }, m.id))
      ] }) : null,
      h.length ? /* @__PURE__ */ y(H, { children: [
        /* @__PURE__ */ y("div", { className: "bmd-section", children: [
          i.incoming,
          " · ",
          h.length
        ] }),
        h.map((m) => /* @__PURE__ */ y("button", { type: "button", className: "bmd-rel", onClick: () => o(m.source), children: [
          /* @__PURE__ */ u("span", { className: "bmd-rel-type", children: Bs[m.type] }),
          /* @__PURE__ */ y("span", { className: "bmd-rel-name", children: [
            /* @__PURE__ */ u("b", { children: n.get(m.source) || m.source }),
            ".",
            m.field,
            m.inverseField ? ` (${m.inverseField})` : ""
          ] }),
          /* @__PURE__ */ u(Wt, { className: "bmd-icon" })
        ] }, m.id))
      ] }) : null
    ] })
  ] });
}
function Us({ initial: e, t, canReset: n, onApply: r, onReset: i, onDownload: a, onClose: o }) {
  const [s, l] = S(e), [d, c] = S(null), h = Q(null), f = Q(null), m = Q(!1);
  Z(() => {
    m.current || l(e);
  }, [e]), Z(() => {
    if (!m.current) return;
    const _ = setTimeout(() => {
      try {
        r(ms(s)), c(null);
      } catch (b) {
        b instanceof fe ? c({ message: b.message, line: b.line }) : c({ message: String(b), line: 0 });
      }
    }, 350);
    return () => clearTimeout(_);
  }, [s, r]);
  const k = V(() => s.split(`
`).length, [s]), N = (_) => {
    const b = new FileReader();
    b.onload = () => {
      m.current = !0, l(String(b.result || ""));
    }, b.readAsText(_);
  };
  return /* @__PURE__ */ y("aside", { className: "bmd-panel bmd-panel--wide", "aria-label": t.jdlTitle, children: [
    /* @__PURE__ */ y("div", { className: "bmd-panel-head", children: [
      /* @__PURE__ */ u("div", { className: "bmd-panel-title", children: /* @__PURE__ */ u("h3", { children: t.jdlTitle }) }),
      /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn bmd-btn--icon", onClick: o, "aria-label": t.close, title: t.close, children: /* @__PURE__ */ u(Mn, {}) })
    ] }),
    /* @__PURE__ */ y("div", { className: "bmd-jdl", children: [
      /* @__PURE__ */ u("p", { className: "bmd-jdl-hint", children: t.jdlHint }),
      /* @__PURE__ */ y("div", { className: "bmd-editor", children: [
        /* @__PURE__ */ u("div", { className: "bmd-gutter", ref: f, children: Array.from({ length: k }, (_, b) => /* @__PURE__ */ u("div", { className: d && d.line === b + 1 ? "is-error" : void 0, children: b + 1 }, b)) }),
        /* @__PURE__ */ u(
          "textarea",
          {
            name: "jdl",
            className: "bmd-textarea",
            spellCheck: !1,
            value: s,
            wrap: "off",
            onScroll: (_) => {
              f.current && (f.current.scrollTop = _.currentTarget.scrollTop);
            },
            onChange: (_) => {
              m.current = !0, l(_.target.value);
            },
            onKeyDown: (_) => {
              if (_.key === "Tab") {
                _.preventDefault();
                const b = _.currentTarget, M = b.selectionStart, T = `${s.slice(0, M)}  ${s.slice(b.selectionEnd)}`;
                m.current = !0, l(T), requestAnimationFrame(() => b.setSelectionRange(M + 2, M + 2));
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ y("div", { className: "bmd-jdl-foot", children: [
        d ? /* @__PURE__ */ y("div", { className: "bmd-error-msg", children: [
          d.line ? `${t.parseError} ${d.line} — ` : "",
          d.message
        ] }) : null,
        /* @__PURE__ */ u(
          "input",
          {
            ref: h,
            type: "file",
            accept: ".jdl,.jh,.txt",
            hidden: !0,
            onChange: (_) => {
              const b = _.target.files && _.target.files[0];
              b && N(b), _.target.value = "";
            }
          }
        ),
        /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: () => h.current && h.current.click(), children: [
          /* @__PURE__ */ u(Ts, {}),
          t.import
        ] }),
        /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: () => a(s), children: [
          /* @__PURE__ */ u($n, {}),
          t.download
        ] }),
        n ? /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            className: "bmd-btn bmd-btn--outline",
            style: { marginLeft: "auto" },
            onClick: () => {
              m.current = !1, c(null), i();
            },
            children: [
              /* @__PURE__ */ u(Fs, {}),
              t.reset
            ]
          }
        ) : null
      ] })
    ] })
  ] });
}
function Ys({ entities: e, hidden: t, selectedId: n, colors: r, t: i, onToggle: a, onSetAll: o, onFocus: s, searchRef: l }) {
  const [d, c] = S(""), [h, f] = S(/* @__PURE__ */ new Set()), m = V(() => {
    const b = d.trim().toLowerCase();
    return b ? e.filter((M) => M.id.toLowerCase().includes(b) || (M.table || "").toLowerCase().includes(b)) : e;
  }, [e, d]), k = V(() => {
    const b = /* @__PURE__ */ new Map();
    for (const M of m) {
      const T = b.get(M.namespace) || [];
      T.push(M), b.set(M.namespace, T);
    }
    return Array.from(b.entries()).sort(([M], [T]) => M.localeCompare(T));
  }, [m]), N = e.filter((b) => !t.has(b.id)).length, _ = m.map((b) => b.id);
  return /* @__PURE__ */ y("aside", { className: "bmd-sidebar", "aria-label": i.entities, children: [
    /* @__PURE__ */ y("div", { className: "bmd-sidebar-head", children: [
      /* @__PURE__ */ y("label", { className: "bmd-search", children: [
        /* @__PURE__ */ u(Cs, {}),
        /* @__PURE__ */ u("input", { ref: l, name: "search", className: "bmd-input", type: "search", placeholder: i.search, value: d, onChange: (b) => c(b.target.value) })
      ] }),
      /* @__PURE__ */ y("div", { className: "bmd-sidebar-meta", children: [
        /* @__PURE__ */ y("span", { children: [
          N,
          " / ",
          e.length,
          " ",
          i.visible
        ] }),
        /* @__PURE__ */ y("span", { style: { display: "flex", gap: 10 }, children: [
          /* @__PURE__ */ u("button", { type: "button", className: "bmd-link", onClick: () => o(!0, _), children: i.showAll }),
          /* @__PURE__ */ u("button", { type: "button", className: "bmd-link", onClick: () => o(!1, _), children: i.hideAll })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ y("div", { className: "bmd-tree", children: [
      k.length === 0 ? /* @__PURE__ */ u("div", { className: "bmd-empty-list", children: i.noResult }) : null,
      k.map(([b, M]) => {
        const T = h.has(b) && !d;
        return /* @__PURE__ */ y("div", { className: "bmd-ns", children: [
          /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              className: "bmd-ns-head",
              "aria-expanded": !T,
              onClick: () => f((j) => {
                const D = new Set(j);
                return D.has(b) ? D.delete(b) : D.add(b), D;
              }),
              title: b,
              children: [
                /* @__PURE__ */ u(zs, {}),
                /* @__PURE__ */ u("span", { className: "bmd-dot", style: { background: r.get(b) } }),
                /* @__PURE__ */ u("span", { className: "bmd-ns-name", children: b || "\\" }),
                /* @__PURE__ */ u("span", { className: "bmd-count", children: M.length })
              ]
            }
          ),
          !T && M.map((j) => {
            const D = t.has(j.id);
            return /* @__PURE__ */ y("div", { className: `bmd-item${D ? " is-hidden" : ""}${n === j.id ? " is-selected" : ""}`, children: [
              /* @__PURE__ */ u("button", { type: "button", className: "bmd-eye", onClick: () => a(j.id), "aria-label": D ? i.showAll : i.hideAll, title: j.id, children: D ? /* @__PURE__ */ u(Ps, {}) : /* @__PURE__ */ u(As, {}) }),
              /* @__PURE__ */ u("button", { type: "button", className: "bmd-item-name", onClick: () => s(j.id), title: j.table ? `${j.id} (${j.table})` : j.id, children: j.name })
            ] }, j.id);
          })
        ] }, b || "_");
      })
    ] })
  ] });
}
const On = { hidden: [], positions: {}, direction: "TB", detail: "all" };
function Hs(e, t) {
  const n = { ...On, detail: t > 40 ? "keys" : "all" };
  if (!e) return n;
  try {
    const r = window.localStorage.getItem(e);
    return r ? { ...n, ...JSON.parse(r) } : n;
  } catch {
    return n;
  }
}
function Js(e, t) {
  if (e)
    try {
      window.localStorage.setItem(e, JSON.stringify(t));
    } catch {
    }
}
function Xs() {
  const e = typeof window != "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, [t, n] = S(e ? e.matches : !1);
  return Z(() => {
    if (!e) return;
    const r = (i) => n(i.matches);
    return e.addEventListener("change", r), () => e.removeEventListener("change", r);
  }, [e]), t;
}
function Ut(e) {
  const t = [e.database, e.driver ? `(${e.driver})` : null].filter(Boolean).join(" ");
  return t ? `${e.name} — ${t}` : e.name;
}
function Ks(e) {
  const t = V(() => ds(e.locale), [e.locale]), n = Q(e);
  n.current = e;
  const r = Q(null), i = Q(null), a = Q(null), o = Q(null), s = Xs(), [l, d] = S(null), c = l || (e.theme === "light" || e.theme === "dark" ? e.theme : s ? "dark" : "light"), [h, f] = S(null);
  ft(() => {
    e.injectStyles !== !1 && vs(r.current);
    const p = r.current ? getComputedStyle(r.current) : null, v = p && p.fontFamily || "sans-serif", O = p && p.getPropertyValue("--_mono").trim() || "monospace";
    f(() => gs(v, O));
  }, [e.injectStyles]);
  const [m, k] = S(e.manager), [N, _] = S(e.schema || null), [b, M] = S(null), [T, j] = S(!e.schema), [D, w] = S(null), g = b || N, C = Se(async (p) => {
    j(!0), w(null);
    try {
      const v = await qn(n.current, p);
      _(v), M(null);
    } catch (v) {
      w(v instanceof Error ? v.message : String(v));
    } finally {
      j(!1);
    }
  }, []);
  Z(() => {
    if (e.schema) {
      _(e.schema), j(!1);
      return;
    }
    C(m);
  }, [e.schema, e.apiUrl, m, C]), Z(() => {
    e.manager !== void 0 && k(e.manager);
  }, [e.manager]);
  const I = V(() => e.storageKey === !1 || !g ? null : `${e.storageKey || `doctrine-diagram:${e.apiUrl || "static"}`}:${b ? "jdl" : g.manager}`, [e.storageKey, e.apiUrl, g, b]), [E, F] = S(On), x = g ? g.entities.length : 0;
  Z(() => F(Hs(I, x)), [I, x]);
  const $ = Se(
    (p) => {
      F((v) => {
        const O = { ...v, ...p };
        return Js(I, O), O;
      });
    },
    [I]
  ), [R, J] = S(!0), [B, ae] = S(!1), [U, de] = S(null), [oe, K] = S(null), [W, ve] = S(null), [pe, ce] = S(!1), [se, Ne] = S(null), [te, $e] = S({ x: 0, y: 0, k: 1 }), [Cn, In] = S({ width: 800, height: 600 }), [Fe, dt] = S({});
  Z(() => {
    de(null), ve(null);
  }, [g]), Z(() => {
    if (!se) return;
    const p = setTimeout(() => Ne(null), 1800);
    return () => clearTimeout(p);
  }, [se]), Z(() => {
    const p = i.current;
    if (!p || typeof ResizeObserver == "undefined") return;
    const v = new ResizeObserver(([O]) => In({ width: O.contentRect.width, height: O.contentRect.height }));
    return v.observe(p), () => v.disconnect();
  }, [g, T]);
  const G = g ? g.entities : [], be = g ? g.relations : [], ye = V(() => new Set(E.hidden), [E.hidden]), Ve = V(() => {
    const p = /* @__PURE__ */ new Map();
    return G.forEach((v) => p.set(v.name, (p.get(v.name) || 0) + 1)), new Map(G.map((v) => [v.id, p.get(v.name) === 1 ? v.name : v.id]));
  }, [G]), Ge = V(() => {
    const p = /* @__PURE__ */ new Map();
    return G.forEach((v) => {
      p.has(v.namespace) || p.set(v.namespace, is(v.namespace));
    }), p;
  }, [G]), Me = V(() => {
    let p = G.filter((v) => !ye.has(v.id));
    if (W) {
      const v = /* @__PURE__ */ new Set([W]);
      be.forEach((L) => {
        L.source === W && v.add(L.target), L.target === W && v.add(L.source);
      });
      const O = G.find((L) => L.id === W);
      O && O.parent && v.add(O.parent), p = G.filter((L) => v.has(L.id));
    }
    return p;
  }, [G, be, ye, W]), ge = V(() => {
    const p = new Set(Me.map((v) => v.id));
    return be.filter((v) => p.has(v.source) && p.has(v.target));
  }, [Me, be]), Oe = V(() => h ? Me.map((p) => {
    const v = Zo(p, ge, Ve, E.detail), { width: O, height: L } = Qo(p, v, h);
    return { id: p.id, entity: p, rows: v, width: O, height: L };
  }) : [], [Me, ge, Ve, E.detail, h]), ct = V(() => es(Oe, ge, E.direction), [Oe, ge, E.direction]), Y = V(
    () => Oe.map((p) => {
      const v = Fe[p.id] || !W && E.positions[p.id] || ct.get(p.id) || { x: 0, y: 0 };
      return { ...p, x: v.x, y: v.y };
    }),
    [Oe, ct, E.positions, Fe, W]
  ), xe = V(() => new Map(Y.map((p) => [p.id, p])), [Y]), jn = V(() => ts(xe, ge), [xe, ge]), Ce = Se(
    (p = Y) => {
      const v = i.current;
      if (!v || !p.length) return;
      const O = v.clientWidth, L = v.clientHeight, q = kn(p), re = it(Math.min((O - 80) / Math.max(1, q.width), (L - 80) / Math.max(1, q.height), 1.1));
      $e({ k: re, x: (O - q.width * re) / 2 - q.x * re, y: (L - q.height * re) / 2 - q.y * re });
    },
    [Y]
  ), qe = `${g ? g.manager : ""}|${b ? "jdl" : "db"}|${E.direction}|${E.detail}|${W || ""}|${Y.length > 0}`, Be = Q("");
  ft(() => {
    !Y.length || Be.current === qe || (Be.current = qe, Ce(Y));
  }, [qe, Y, Ce]);
  const Ie = (p) => {
    const v = i.current, O = v ? v.clientWidth : 800, L = v ? v.clientHeight : 600;
    $e((q) => {
      const re = it(q.k * p), An = (O / 2 - q.x) / q.k, Pn = (L / 2 - q.y) / q.k;
      return { k: re, x: O / 2 - An * re, y: L / 2 - Pn * re };
    });
  }, We = (p, v) => {
    const O = i.current;
    O && $e((L) => {
      const q = v || L.k;
      return { k: q, x: O.clientWidth / 2 - p.x * q, y: O.clientHeight / 2 - p.y * q };
    });
  }, je = Se(
    (p) => {
      if (de(p), n.current.onEntitySelect) {
        const v = p && G.find((O) => O.id === p) || null;
        n.current.onEntitySelect(v);
      }
    },
    [G]
  ), ut = (p) => {
    ye.has(p) && $({ hidden: E.hidden.filter((O) => O !== p) }), je(p);
    const v = xe.get(p);
    v && We({ x: v.x + v.width / 2, y: v.y + v.height / 2 }, Math.max(te.k, 0.8));
  };
  Z(() => {
    if (!U) return;
    const p = xe.get(U), v = i.current;
    if (!p || !v) return;
    const O = p.x * te.k + te.x, L = p.y * te.k + te.y;
    (O > v.clientWidth || L > v.clientHeight || O + p.width * te.k < 0 || L + p.height * te.k < 0) && We({ x: p.x + p.width / 2, y: p.y + p.height / 2 });
  }, [U, xe]);
  const Ln = (p) => {
    k(p), n.current.onManagerChange && n.current.onManagerChange(p);
  }, we = g ? b ? "diagram" : g.manager : "diagram", Le = async (p) => {
    if (ce(!1), !!g)
      try {
        p === "json" && Ee(JSON.stringify(g, null, 2), `${we}.json`, "application/json"), p === "jdl" && Ee(Vt(g), `${we}.jdl`), p === "svg" && a.current && r.current && as(a.current, Y, r.current, `${we}.svg`), p === "png" && a.current && r.current && await os(a.current, Y, r.current, `${we}.png`);
      } catch (v) {
        Ne(v instanceof Error ? v.message : String(v));
      }
  }, Sn = (p) => {
    const v = p.target.tagName;
    if (v === "INPUT" || v === "TEXTAREA" || v === "SELECT") {
      p.key === "Escape" && p.target.blur();
      return;
    }
    p.key === "/" ? (p.preventDefault(), J(!0), setTimeout(() => o.current && o.current.focus(), 0)) : p.key === "f" ? Ce() : p.key === "+" || p.key === "=" ? Ie(1.2) : p.key === "-" ? Ie(1 / 1.2) : p.key === "Escape" && (ce(!1), je(null));
  }, ke = U && G.find((p) => p.id === U) || null, Ue = N ? N.managers : [], ht = Ue.find((p) => p.name === (N && N.manager)), Tn = e.title || g && g.title || "Doctrine Diagram", Rn = g ? b ? `${t.jdlSource} · ${G.length} ${t.entities.toLowerCase()}` : `${G.length} ${t.entities.toLowerCase()} · ${be.length} ${t.relations.toLowerCase()}` : "", Dn = { mapped_superclass: "mapped", embeddable: "embeddable", enum: "enum" };
  return /* @__PURE__ */ y(
    "div",
    {
      ref: r,
      className: `bmd${e.className ? ` ${e.className}` : ""}`,
      "data-theme": c,
      style: { height: e.height === void 0 ? "100%" : e.height },
      onKeyDown: Sn,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ y("header", { className: "bmd-toolbar", children: [
          /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn bmd-btn--icon", "aria-pressed": R, onClick: () => J((p) => !p), title: t.toggleSidebar, "aria-label": t.toggleSidebar, children: /* @__PURE__ */ u(Os, {}) }),
          /* @__PURE__ */ y("div", { className: "bmd-brand", children: [
            /* @__PURE__ */ u("span", { className: "bmd-logo", children: /* @__PURE__ */ u(Ms, { className: "bmd-icon" }) }),
            /* @__PURE__ */ y("div", { style: { minWidth: 0 }, children: [
              /* @__PURE__ */ u("div", { className: "bmd-title", children: Tn }),
              /* @__PURE__ */ u("div", { className: "bmd-subtitle", children: Rn })
            ] })
          ] }),
          Ue.length ? /* @__PURE__ */ y("label", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, title: t.manager, children: [
            /* @__PURE__ */ u(Bt, { className: "bmd-icon", style: { color: "var(--_muted)" } }),
            /* @__PURE__ */ u("select", { name: "manager", className: "bmd-select", value: N ? N.manager : "", onChange: (p) => Ln(p.target.value), "aria-label": t.manager, disabled: !!e.schema, children: Ue.map((p) => /* @__PURE__ */ u("option", { value: p.name, children: Ut(p) }, p.name)) })
          ] }) : null,
          b ? /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--outline", onClick: () => M(null), title: ht ? Ut(ht) : "", children: [
            /* @__PURE__ */ u(Bt, {}),
            t.reset
          ] }) : null,
          /* @__PURE__ */ u("span", { className: "bmd-sep bmd-hide-sm" }),
          /* @__PURE__ */ u("div", { className: "bmd-group bmd-hide-sm", role: "group", "aria-label": t.detail, children: ["all", "keys", "none"].map((p) => /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn", "aria-pressed": E.detail === p, onClick: () => $({ detail: p }), children: p === "all" ? t.detailAll : p === "keys" ? t.detailKeys : t.detailNone }, p)) }),
          /* @__PURE__ */ y("div", { className: "bmd-group bmd-hide-sm", role: "group", "aria-label": t.direction, children: [
            /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn", "aria-pressed": E.direction === "LR", onClick: () => $({ direction: "LR", positions: {} }), title: t.horizontal, children: /* @__PURE__ */ u(qt, { style: { transform: "rotate(-90deg)" } }) }),
            /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn", "aria-pressed": E.direction === "TB", onClick: () => $({ direction: "TB", positions: {} }), title: t.vertical, children: /* @__PURE__ */ u(qt, {}) })
          ] }),
          /* @__PURE__ */ y("div", { className: "bmd-group", role: "group", children: [
            /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn", onClick: () => Ie(1 / 1.25), title: t.zoomOut, "aria-label": t.zoomOut, children: /* @__PURE__ */ u(js, {}) }),
            /* @__PURE__ */ y("span", { className: "bmd-zoom", children: [
              Math.round(te.k * 100),
              "%"
            ] }),
            /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn", onClick: () => Ie(1.25), title: t.zoomIn, "aria-label": t.zoomIn, children: /* @__PURE__ */ u(Is, {}) }),
            /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn", onClick: () => Ce(), title: t.fit, "aria-label": t.fit, children: /* @__PURE__ */ u(Ls, {}) })
          ] }),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              className: "bmd-btn bmd-btn--outline bmd-hide-sm",
              onClick: () => {
                $({ positions: {} }), Be.current = "";
              },
              title: t.relayout,
              children: t.relayout
            }
          ),
          /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--outline", "aria-pressed": B, onClick: () => ae((p) => !p), title: t.jdlTitle, children: [
            /* @__PURE__ */ u(Ss, {}),
            t.jdl
          ] }),
          /* @__PURE__ */ y("div", { className: "bmd-menu", children: [
            /* @__PURE__ */ y("button", { type: "button", className: "bmd-btn bmd-btn--primary", "aria-haspopup": "menu", "aria-expanded": pe, onClick: () => ce((p) => !p), disabled: !g, children: [
              /* @__PURE__ */ u($n, {}),
              /* @__PURE__ */ u("span", { className: "bmd-hide-sm", children: t.export })
            ] }),
            pe ? /* @__PURE__ */ y("div", { className: "bmd-menu-list", role: "menu", children: [
              /* @__PURE__ */ u("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Le("svg"), children: t.exportSvg }),
              /* @__PURE__ */ u("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Le("png"), children: t.exportPng }),
              /* @__PURE__ */ u("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Le("json"), children: t.exportJson }),
              /* @__PURE__ */ u("button", { type: "button", role: "menuitem", className: "bmd-menu-item", onClick: () => Le("jdl"), children: t.exportJdl })
            ] }) : null
          ] }),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              className: "bmd-btn bmd-btn--icon",
              onClick: () => d(c === "dark" ? "light" : "dark"),
              title: t.theme,
              "aria-label": t.theme,
              children: c === "dark" ? /* @__PURE__ */ u(Rs, {}) : /* @__PURE__ */ u(Ds, {})
            }
          )
        ] }),
        /* @__PURE__ */ y("div", { className: "bmd-body", onPointerDown: () => pe && ce(!1), children: [
          R && g ? /* @__PURE__ */ u(
            Ys,
            {
              entities: G,
              hidden: ye,
              selectedId: U,
              colors: Ge,
              t,
              searchRef: o,
              onToggle: (p) => $({ hidden: ye.has(p) ? E.hidden.filter((v) => v !== p) : [...E.hidden, p] }),
              onSetAll: (p, v) => {
                const O = new Set(E.hidden);
                v.forEach((L) => p ? O.delete(L) : O.add(L)), $({ hidden: Array.from(O) });
              },
              onFocus: ut
            }
          ) : null,
          /* @__PURE__ */ y(
            Ns,
            {
              boxes: Y,
              edges: jn,
              viewport: te,
              onViewport: $e,
              selectedId: U,
              hoveredId: oe,
              onHover: K,
              onSelect: je,
              onMove: (p, v, O) => dt((L) => ({ ...L, [p]: { x: v, y: O } })),
              onMoveEnd: () => {
                W || $({ positions: { ...E.positions, ...Fe } }), dt({});
              },
              colors: Ge,
              kindLabels: Dn,
              svgRef: a,
              stageRef: i,
              hint: t.shortcuts,
              children: [
                T ? /* @__PURE__ */ u("div", { className: "bmd-state", children: /* @__PURE__ */ y("div", { className: "bmd-state-box", children: [
                  /* @__PURE__ */ u("div", { className: "bmd-spinner" }),
                  t.loading
                ] }) }) : null,
                !T && D ? /* @__PURE__ */ u("div", { className: "bmd-state", children: /* @__PURE__ */ y("div", { className: "bmd-state-box", children: [
                  /* @__PURE__ */ u("strong", { children: t.error }),
                  /* @__PURE__ */ u("span", { children: D }),
                  /* @__PURE__ */ u("button", { type: "button", className: "bmd-btn bmd-btn--primary", onClick: () => C(m), children: t.retry })
                ] }) }) : null,
                !T && !D && g && !G.length ? /* @__PURE__ */ u("div", { className: "bmd-state", children: /* @__PURE__ */ u("div", { className: "bmd-state-box", children: t.empty }) }) : null,
                Y.length > 1 ? /* @__PURE__ */ u($s, { boxes: Y, viewport: te, stageSize: Cn, colors: Ge, onCenter: (p) => We(p) }) : null,
                se ? /* @__PURE__ */ u("div", { className: "bmd-toast", children: se }) : null
              ]
            }
          ),
          ke && !B ? /* @__PURE__ */ u(
            Ws,
            {
              entity: ke,
              relations: be,
              names: Ve,
              focused: W === ke.id,
              t,
              onClose: () => je(null),
              onSelect: ut,
              onFocusToggle: () => ve((p) => p === ke.id ? null : ke.id)
            }
          ) : null,
          B ? /* @__PURE__ */ u(
            Us,
            {
              initial: N ? Vt(N) : "",
              t,
              canReset: !!N,
              onApply: M,
              onReset: () => M(null),
              onDownload: (p) => Ee(p, `${we}.jdl`),
              onClose: () => ae(!1)
            }
          ) : null
        ] })
      ]
    }
  );
}
function sl(e, t) {
  const n = Vn(e);
  let r = { ...t };
  const i = () => n.render(/* @__PURE__ */ u(Ks, { ...r }));
  return i(), {
    update(a) {
      r = { ...r, ...a }, i();
    },
    unmount() {
      n.unmount();
    }
  };
}
export {
  mt as ApiError,
  Ks as DiagramStudio,
  fe as JdlError,
  nl as fetchManagers,
  qn as fetchSchema,
  sl as mount,
  ms as parseJdl,
  ol as stylesheet,
  Vt as toJdl
};
