<template>
    <div class="con">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="0">用户树</el-menu-item>
            <el-menu-item index="1">用户列表</el-menu-item>
            <el-menu-item index="2">用户收益</el-menu-item>
            <el-menu-item index="3">投票记录</el-menu-item>
            <el-menu-item index="4">投票记录详情</el-menu-item>

        </el-menu>
        <div class="show_con" v-show="list[0].is_show">
            <el-tree
                    :data="tree_data"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :render-content="renderContent"
                    :default-expand-all=true
            ></el-tree>
        </div>
        <div class="show_con" v-show="list[1].is_show">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
                    :header-cell-style="this.tableHeaderColor"
            >
                <el-table-column
                        label="用户地址"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.address}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户等级"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.level}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户称号"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户自投票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.votesSelf}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户贡献投票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.votesContributed}}</span>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    background
                    @current-change="currentPageChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total,prev, pager, next"
                    :total="totla">
            </el-pagination>
        </div>
        <div class="show_con" v-show="list[2].is_show">
            <el-table
                    :data="tableData_1"
                    border
                    style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
                    :header-cell-style="this.tableHeaderColor"
            >
                <el-table-column
                        label="交易hash"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.hash}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="收益"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.profits}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="节点权益乘数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.nodeMultiplier}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="称号权益乘数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.titleMultiplier}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="每票价值"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.votePrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.votes}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="投票用户地址"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.userAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="时间"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{timestampToTime(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.status==0?'创建':scope.row.status==1?'交易成功':'交易失败'}}</span>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    background
                    @current-change="currentPageChange_1"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total,prev, pager, next"
                    :total="totla_1">
            </el-pagination>
        </div>
        <div class="show_con" v-show="list[3].is_show">
            <el-table
                    :data="tableData_2"
                    border
                    style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
                    :header-cell-style="this.tableHeaderColor"
            >
                <el-table-column
                        label="投票用户地址"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.userAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalVotes}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="弃票，票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.totalVotesAbstained}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="时间"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{timestampToTime(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.status==0?'满':scope.row.status==1?'尚有余票':'弃完所有票'}}</span>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    background
                    @current-change="currentPageChange_2"
                    :current-page="currentPage_2"
                    :page-size="pagesize"
                    layout="total,prev, pager, next"
                    :total="totla_2">
            </el-pagination>
        </div>
        <div class="show_con" v-show="list[4].is_show">
            <el-table
                    :data="tableData_3"
                    border
                    style="width: 100%;margin-bottom: 30px;margin-top: 40px;min-height: 529px"
                    :header-cell-style="this.tableHeaderColor"
            >
                <el-table-column
                        label="vote.id"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.voteId}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="投票用户地址"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.userAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上级地址"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.targetAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.votes}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="弃票，票数"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.votesAbstained}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="应得比例"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.deserveRate}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="时间"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{timestampToTime(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.status==0?'满':scope.row.status==1?'尚有余票':'弃完所有票'}}</span>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    background
                    @current-change="currentPageChange_3"
                    :current-page="currentPage_3"
                    :page-size="pagesize"
                    layout="total,prev, pager, next"
                    :total="totla_3">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getUsers, getUserTree, getUserProfit, getVote, getVoteDetail} from '../apis/getData'

    export default {

        data() {
            return {
                activeIndex: '0',
                list: [
                    {is_show: true},
                    {is_show: false},
                    {is_show: false},
                    {is_show: false},
                    {is_show: false},
                ],
                tree_data: [],
                defaultProps: {
                    children: 'children',
                    label: 'data'
                },
                tableData: [],
                currentPage: 1,
                pagesize: 10,
                totla: 0,
                tableData_1: [],
                currentPage_1: 1,
                totla_1: 0,
                tableData_2: [],
                currentPage_2: 1,
                totla_2: 0,
                tableData_3: [],
                currentPage_3: 1,
                totla_3: 0,
            };
        },
        created() {
            this.getUserTree()
        },

        methods: {
            handleSelect(key, keyPath) {
                this.list.forEach((item, index, myself) => {
                    if (index == key) {
                        item.is_show = true
                    } else {
                        item.is_show = false
                    }
                })
                if (key == 1) {
                    this.getUsers(1)
                    this.currentPage = 1
                } else if (key == 2) {
                    this.getUserProfit(1)
                    this.currentPage_1 = 1
                } else if (key == 3) {
                    this.getVote(1)
                    this.currentPage_2 = 1
                } else if (key == 4) {
                    this.getVoteDetail(1)
                    this.currentPage_3 = 1
                }
            },
            handleNodeClick(data) {

            },
            renderContent(h, {node, data}) {
                return (
                    < span
            class
                = "custom-tree-node" >
                    < span > 等级：<
                /span>
                < span
            class
                = 'widths' > {data.data.level} < /span>
                    < span > 称号：<
                /span>
                < span
            class
                = 'widths' > {data.data.title} < /span>
                    < span > 自投票数：<
                /span>
                < span
            class
                = 'widths' > {data.data.votesSelf} < /span>
                    < span > 贡献票数：<
                /span>
                < span
            class
                = 'widths' > {data.data.votesContributed} < /span>
                    < span > 邀请码：<
                /span>
                < span
            class
                = 'widths' > {data.data.invitecode} < /span>
                    < span > 节点地址：<
                /span>
                < span
            class
                = 'widths' > {data.data.address} < /span>
                    < /span>
            )
            },
            getUserTree() {
                getUserTree().then(response => {
                    this.tree_data = response.data
                })
            },
            getUsers(e) {
                let data = {
                    page: e,
                    rows: this.pagesize
                }
                getUsers(data).then(response => {
                    this.tableData = response.data.data
                    this.totla = response.data.total
                })
            },
            currentPageChange(e) {
                this.currentPage = e
                this.getUsers(this.currentPage)
            },
            getUserProfit(e) {
                let data = {
                    page: e,
                    rows: this.pagesize
                }
                getUserProfit(data).then(response => {
                    this.tableData_1 = response.data.data
                    this.totla_1 = response.data.total
                })
            },
            currentPageChange_1(e) {
                this.currentPage_1 = e
                this.getUserProfit(this.currentPage_1)
            },
            getVote(e) {
                let data = {
                    page: e,
                    rows: this.pagesize
                }
                getVote(data).then(response => {
                    this.tableData_2 = response.data.data
                    this.totla_2 = response.data.total
                })
            },
            currentPageChange_2(e) {
                this.currentPage_2 = e
                this.getVote(this.currentPage_2)
            },
            getVoteDetail(e) {
                let data = {
                    page: e,
                    rows: this.pagesize
                }
                getVoteDetail(data).then(response => {
                    this.tableData_3 = response.data.data
                    this.totla_3 = response.data.total
                })
            },
            currentPageChange_3(e) {
                this.currentPage_3 = e
                this.getVoteDetail(this.currentPage_3)
            },


        }
    };
</script>
<style>
    .widths {
        display: inline-block;
        min-width: 80px;
        color: #409EFF;
    }
</style>
<style scoped>

    .con {
        width: 90%;
        margin: 2% 5%;
    }

    .show_con {
        margin-top: 30px;
    }

    .el-pagination {
        position: relative;
        float: right;
        margin-right: 3%;
        margin-top: 30px;
        margin-bottom: 50px;
    }

</style>
