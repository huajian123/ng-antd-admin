---
title: array
subtitle: Array
type: Type
---

Used for conversion and access between arrays and trees. It is generally used with `nz-tree`.

## treeToArr

Convert tree structure to array structure.

**options**

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `deepMapName` | Deep map name | `string` | `deep` |
| `parentMapName` | Parent item map name of flat array | `string` | `parent` |
| `childrenMapName` | Source data children map name | `string` | `children` |
| `clearChildren` | Whether remove `children` item | `boolean` | `true` |
| `cb` | Callback event | `(item: any, parent: any, deep: number) => void` | - |

## arrToTree

Convert array structure to tree structure.

> If `parent_id` is a string, the root value **Make Sure** is an empty string.

**options**

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `idMapName` | Id map name | `string` | `id` |
| `parentIdMapName` | Parent id map name | `string` | `parent_id` |
| `rootParentIdValue` | Root parent id value, the most suitable root parent id value will be automatically calculated by default | `any` | - |
| `childrenMapName` | Children map name | `string` | `children` |
| `cb` | Callback event | `(item: any) => void` | - |

## arrToTreeNode

Convert array structure to `nz-tree` data structure.

**options**

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `idMapName` | Id map name | `string` | `id` |
| `parentIdMapName` | Parent id map name | `string` | `parent_id` |
| `titleMapName` | Title map name | `string` | `title` |
| `isLeafMapName` | isLeaf map name, if value does not exist, include `children` value to determine whether it's a leaf node | `string` | `isLeaf` |
| `checkedMapname` | Checked map name | `string` | `checked` |
| `selectedMapname` | Selected map name | `string` | `selected` |
| `expandedMapname` | Expanded map name (Except leaf nodes) | `string` | `expanded` |
| `disabledMapname` | Disabled map name | `string` | `disabled` |
| `cb` | Callback event | `(item: any, parent: any, deep: number) => void` | - |

## visitTree

Recursive access tree.

**options**

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `childrenMapName` | Children map name | `string` | `children` |

## getKeysByTreeNode

Get all the selected `key` values.

**options**

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `includeHalfChecked` | Whether include half-checked | `boolean` | `true` |
| `keyMapName` | Whether re-specify `key` name | `string` | - |
| `cb` | Callback event, return `key` value | `(item: NzTreeNode, parent: NzTreeNode, deep: number) => any` | - |
