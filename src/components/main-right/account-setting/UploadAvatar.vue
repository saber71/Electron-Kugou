<template>
    <div id="upload-avatar">
        <account-setting-container ref="container" :active-label="1">
            <section class="content">
                <h2 class="title">设置一个您喜爱的头像：</h2>
                <p class="tip">（请选择图片文件，最佳尺寸400 x 400，支持JPG,JPEG,PNG）</p>
                <section class="upload-image-sec">
                    <div class="top">
                        <button class="select" @click="selectImage">选择文件</button>
                        <button class="upload" @click="upload">上传</button>
                    </div>
                    <div class="bottom">
                        <img :src="uploadImage" v-show="uploadImage">
                    </div>
                </section>
                <section class="clip-img" v-show="selectImg">
                    <div class="bg">
                        <img id="selected-img" :src="selectImg" @click="selectImg=undefined">
                        <div class="rect" :style="rectStyle"
                             @mousedown="onRectDragStart($event)"
                             @mousemove="onRectDrag($event)" @mouseup="onRectDrop"></div>
                        <label class="clip-banner">请选择要截取的部分</label>
                        <button class="confirmation" @click="confirmation">确定</button>
                    </div>
                </section>
            </section>
        </account-setting-container>
    </div>
</template>

<script>
    import AccountSettingContainer from "@/components/main-right/account-setting/AccountSettingContainer";
    import {clipImg, readAsBase64, toSelectImageFiles} from "@/js/util";
    import ajax from "@/js/ajax";
    import {FAIL, LOADING, SUCCESS} from "@/js/event-bus";

    const standardWidth = 400
    const standardHeight = 400
    const rectMoveLimit = {
        width: 0,
        height: 0,
        minY: 0,
        maxY: 0,
        minX: 0,
        maxX: 0,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        down: false,
        positionX: 0,
        positionY: 0,
        imgType: ''
    }

    export default {
        name: "UploadAvatar",
        components: {AccountSettingContainer},
        props: {},
        data() {
            return {
                selectImg: undefined,
                uploadImage: undefined,
                rectStyle: {
                    width: '400px',
                    height: '400px',
                    left: '0',
                    top: '0',
                    background: '',
                    'background-position': ''
                },
            }
        },
        watch: {},
        computed: {},
        methods: {
            selectImage() {
                toSelectImageFiles(false, (filePaths) => {
                    if (filePaths) {
                        rectMoveLimit.imgType = filePaths[0]
                        readAsBase64(filePaths[0], (data) => {
                            this.selectImg = data
                            setTimeout(() => {
                                const selectedImage = document.getElementById('selected-img')
                                const bound = selectedImage.getBoundingClientRect()
                                rectMoveLimit.width = standardWidth < bound.width ? standardWidth : bound.width
                                rectMoveLimit.height = standardHeight < bound.height ? standardHeight : bound.height
                                this.rectStyle.background = 'url(' + data + ') no-repeat'
                                this.rectStyle.width = rectMoveLimit.width + 'px'
                                this.rectStyle.height = rectMoveLimit.height + 'px'
                                rectMoveLimit.minY = bound.y
                                rectMoveLimit.maxY = bound.height + bound.y
                                rectMoveLimit.minX = bound.x
                                rectMoveLimit.maxX = bound.x + bound.width
                                this.rectStyle.left = bound.x + 'px'
                                this.rectStyle.top = bound.y + 'px'
                                this.rectStyle['background-position'] = '0 0'
                            })
                        })
                    }
                })
            },
            onRectDragStart(ev) {
                rectMoveLimit.startX = ev.clientX
                rectMoveLimit.startY = ev.clientY
                rectMoveLimit.down = true
                rectMoveLimit.startLeft = parseInt(this.rectStyle.left.replace('px', ''))
                rectMoveLimit.startTop = parseInt(this.rectStyle.top.replace('px', ''))
            },
            onRectDrag(ev) {
                if (rectMoveLimit.down) {
                    let left = ev.clientX - rectMoveLimit.startX + rectMoveLimit.startLeft
                    let top = ev.clientY - rectMoveLimit.startY + rectMoveLimit.startTop
                    if (left < rectMoveLimit.minX)
                        left = rectMoveLimit.minX
                    else if (left + rectMoveLimit.width > rectMoveLimit.maxX) {
                        left = rectMoveLimit.maxX - rectMoveLimit.width
                    }
                    if (top < rectMoveLimit.minY) {
                        top = rectMoveLimit.minY
                    } else if (top + rectMoveLimit.height > rectMoveLimit.maxY) {
                        top = rectMoveLimit.maxY - rectMoveLimit.height
                    }
                    this.rectStyle.left = left + 'px'
                    this.rectStyle.top = top + 'px'
                    const leftBias = left - rectMoveLimit.minX
                    const topBias = top - rectMoveLimit.minY
                    rectMoveLimit.positionX = leftBias
                    rectMoveLimit.positionY = topBias
                    this.rectStyle['background-position'] = -leftBias + 'px ' + (-topBias) + 'px'
                }
            },
            onRectDrop() {
                rectMoveLimit.down = false
            },
            confirmation() {
                const selectedImg = document.getElementById('selected-img')
                this.uploadImage = clipImg(selectedImg, rectMoveLimit.imgType, {
                    x: rectMoveLimit.positionX,
                    y: rectMoveLimit.positionY,
                    width: rectMoveLimit.width,
                    height: rectMoveLimit.height
                })
                this.selectImg = undefined
            },
            async upload() {
                if (this.uploadImage) {
                    eventBus.$emit(LOADING, true)
                    const res = (await ajax.uploadAvatar(this.uploadImage)).data
                    eventBus.$emit(LOADING, false)
                    if (res) {
                        eventBus.$emit(SUCCESS, true)
                    } else {
                        eventBus.$emit(FAIL, '无法连接服务器，请检查网络')
                    }
                }
            }
        },
        mounted() {
        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../style/common";

    #upload-avatar {
        width: 100%;
        height: $main-right-height;

        .content {
            position: relative;
            width: $account-setting-labels-width;
            margin: auto;

            .title {
                font-size: 12px;
                font-weight: bold;
                color: #777777;
                margin-top: 20px;
            }

            .tip {
                font-size: 12px;
                color: #666666;
                margin-top: 10px;
            }

            .upload-image-sec {
                .top {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;

                    .select, .upload {
                        background-color: #99CC66;
                        color: white;
                        padding: 5px 20px;
                        margin: 0 10px;
                        cursor: pointer;
                        border-radius: 3px;

                        &:hover {
                            filter: brightness(1.1);
                        }
                    }

                    .upload {
                        background-color: $light-blue;
                    }
                }

                .warn {
                    text-align: center;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: red;
                }

                .bottom {
                    margin: 20px auto auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 200px;
                        max-height: 200px;
                        box-shadow: 0 0 2px gray;
                    }
                }
            }

            .clip-img {
                position: fixed;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                user-select: none;
                z-index: 100;

                .bg {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.5);

                    #selected-img {
                        filter: brightness(0.3);
                    }

                    .rect {
                        position: absolute;
                        border-radius: 3px;
                        cursor: move;
                    }

                    .clip-banner {
                        position: fixed;
                        left: 20px;
                        top: 20px;
                        width: fit-content;
                        color: red;
                        font-size: 30px;
                        font-weight: bold;
                    }

                    .confirmation {
                        position: fixed;
                        left: calc(50% - 35px);
                        bottom: 75px;
                        font-size: 20px;
                        padding: 5px 20px;
                        color: white;
                        background-color: rgba(0, 149, 227, 1);
                        border-radius: 3px;

                        &:hover {
                            filter: brightness(1.1);
                        }
                    }
                }
            }
        }
    }
</style>